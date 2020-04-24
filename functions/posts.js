const admin = require('firebase-admin');
const functions = require('firebase-functions');

const app = admin.apps.length === 0 ? admin.initializeApp() : admin.app();

exports.postOnCreate = functions.firestore
  .document('posts/{postId}')
  .onCreate((snap, context) => {
    const { tags, type } = snap.data();
    const increment = app.firestore.FieldValue.increment(1);
    const tagsRef = app.database().ref('tags/');
    const tagsCollection = app.firestore().collection('tags');

    const promises = tags.map((tag) => Promise.all(tagsRef.child(tag).set(true),
      tagsCollection.doc(tag).set({ all: increment, [type]: increment })));


    return Promise.all(promises);
  });
