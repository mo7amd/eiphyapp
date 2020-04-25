const admin = require('firebase-admin');
const functions = require('firebase-functions');
const index = require('flexsearch').create({
  profile: 'fast',
  tokenize: 'full',
  encode: 'advanced',
  suggest: true,
  async: true,
  cache: true,
  depth: 4,
});

let tagsArr = [];

const app = admin.apps.length === 0 ? admin.initializeApp() : admin.app();

exports.searchTags = functions.https.onRequest(async (req, res) => {
  const { searchParam } = req.query;
  let results = [];

  if (typeof searchParam === 'string' && searchParam.length > 1) {
    if (!tagsArr.length) {
      tagsArr = Object.keys(await app.database()
        .ref('tags')
        .once('value')
        .then((snapshot) => snapshot.val()));

      for (let i = 0, len = tagsArr.length; i < len; i++) {
        index.add(i, tagsArr[i]);
      }
    } else if (!index.length) {
      for (let i = 0, len = tagsArr.length; i < len; i++) {
        index.add(i, tagsArr[i]);
      }
    }

    results = await index.search(searchParam, 10);

    for (let i = 0, len = results.length; i < len; i++) {
      results[i] = tagsArr[results[i]];
    }
  }

  res.set('Cache-Control', 'public, max-age=1200, s-maxage=3600');
  res.set('Access-Control-Allow-Origin', '*');
  res.status(200).json(results);
});
