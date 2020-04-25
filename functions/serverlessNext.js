const functions = require('firebase-functions');

const gifsPage = require('./next/serverless/pages/gifs/[id]');
const memesPage = require('./next/serverless/pages/memes/[id]');

exports.gifsPage = functions.https.onRequest((req, res) => {
  res.set('Cache-Control', 'public, max-age=1200, s-maxage=86400');
  return gifsPage.render(req, res);
});
exports.memesPage = functions.https.onRequest((req, res) => {
  res.set('Cache-Control', 'public, max-age=1200, s-maxage=86400');
  return memesPage.render(req, res);
});
