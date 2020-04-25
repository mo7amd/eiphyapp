const admin = require('firebase-admin');
const functions = require('firebase-functions');

const app = admin.apps.length === 0 ? admin.initializeApp() : admin.app();

exports.postOnCreate = functions.firestore
  .document('posts/{postId}')
  .onCreate((snap, context) => {
    const { tags, type } = snap.data();
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

    return Promise.all(promises);
  });
