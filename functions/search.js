const admin = require('firebase-admin');
const functions = require('firebase-functions');
const index = require('flexsearch').create({/* options */});


const app = admin.apps.length === 0 ? admin.initializeApp() : admin.app();

exports.searchTags = functions.https.onRequest(async (req, res) => {
  const tags = await app.database().ref('tags/').once('value').then((snapshot) => snapshot.val());

  const { searchParam } = req.query;
  let results = [];
  if (searchParam) {
    index.add(Object.keys(tags));
    results = index.search(searchParam, 10);
  }

  res.set('Cache-Control', 'public, max-age=1200, s-maxage=3600');
  res.set('Access-Control-Allow-Origin', '*');
  res.status(200).json(results);
});
