const admin = require('firebase-admin');
const functions = require('firebase-functions');

const app = admin.apps.length === 0 ? admin.initializeApp() : admin.app();

exports.postOnCreate = functions.firestore
  .document('posts/{postId}')
  .onCreate((snap, context) => {
    const { tags, type } = snap.data();
    const increment = admin.firestore.FieldValue.increment(1);
    const tagsRef = app.database().ref('tags');
    const db = app.firestore();
    const tagsCollection = db.collection('tags');
    const batch = db.batch();

    const tagsObj = {};
    for (let i = tags.length; i--;) {
      const tag = tags[i];
      tagsObj[tag] = true;
      batch.set(tagsCollection.doc(tag), { all: increment, [type]: increment });
    }

    return Promise.all([tagsRef.set(tagsObj), batch.commit()]);
  });
