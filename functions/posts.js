const admin = require('firebase-admin');
const functions = require('firebase-functions');
const sharp = require('sharp');
const fs = require('fs');
const { execFile } = require('child_process');
const gifsicle = require('gifsicle');

const app = admin.apps.length === 0 ? admin.initializeApp() : admin.app();

function resizeGif({ width, height }, input, output) {
  return new Promise(((resolve) => execFile(gifsicle, ['--resize-fit', `${width}x${height}`, '-o', output, input], (err) => {
    if (err) {
      console.error(err);
    }
    resolve();
  })));
}

function resizeImgs({ width, height }, input, output) {
  return sharp(input)
    .resize({
      width,
      height,
      fit: 'inside',
    })
    .toFile(output);
}

async function imgProcessing(img, thumb) {
  const storage = app.storage();

  let filename = img.url.split('/o/')[1].split('?')[0];
  const filepath = filename.replace(/%2F/g, '/');
  const filetype = (filename.split('.'))[1];
  const filenameOut = `/tmp/out_${filename}`;
  filename = `/tmp/${filename}`;

  let thumbFilename = thumb.url.split('/o/')[1].split('?')[0];
  const thumbFilepath = thumbFilename.replace(/%2F/g, '/');
  thumbFilename = `/tmp/${thumbFilename}`;

  const bucket = storage.bucket();

  await bucket
    .file(filepath)
    .download({ destination: filename });

  const resizeFn = filetype === 'gif' ? resizeGif : resizeImgs;

  await Promise.all([
    resizeFn(thumb, filename, thumbFilename),
    resizeFn(img, filename, filenameOut),
  ]);

  return Promise.all([
    bucket.upload(filenameOut, {
      destination: filepath,
    }),
    bucket.upload(thumbFilename, {
      destination: thumbFilepath,
    }),
  ]).then(() => Promise.all([
    fs.unlink(filename),
    fs.unlink(filenameOut),
    fs.unlink(thumbFilename),
  ]));
}

exports.postOnCreate = functions.firestore
  .document('posts/{postId}')
  .onCreate(async (snap, context) => {
    const {
      tags, type, img, thumb,
    } = snap.data();
    const increment = admin.firestore.FieldValue.increment(1);
    const db = app.firestore();
    const batch = db.batch();

    const tagsRef = app.database().ref('tags');
    const tagsCollection = db.collection('tags');

    const promises = [];
    for (let i = tags.length; i--;) {
      const tag = tags[i];
      batch.set(tagsCollection.doc(tag), { all: increment, [type]: increment });
      promises.push(tagsRef.child(tag).set(true));
    }

    promises.push(batch.commit());
    promises.push(imgProcessing(img, thumb));

    return Promise.all(promises);
  });
