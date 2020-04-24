const admin = require('firebase-admin');
const functions = require('firebase-functions');

const app = admin.apps.length === 0 ? admin.initializeApp() : admin.app();

exports.postOnCreate = functions.firestore
  .document('posts/{postId}')
  .onCreate((snap, context) => {
    const { tags, type } = snap.data();
    const tagsRef = app.database().ref('tags/');

    const promises = tags.map((tag) => tagsRef.child(tag)
      .transaction((tagData = {}) => {
        const { all = 0, [type]: tagType = 0 } = tagData || {};
        return {
          all: all + 1,
          [type]: tagType + 1,
        };
      }));

    return Promise.all(promises);
  });
