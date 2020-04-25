// const { next } = require('./next');
const { postOnCreate } = require('./posts');
const { searchTags } = require('./search');
const { gifsPage, memesPage } = require('./serverlessNext');

// exports.next = next;
exports.postOnCreate = postOnCreate;
exports.searchTags = searchTags;
exports.gifsPage = gifsPage;
exports.memesPage = memesPage;
