const { next } = require('./next');
const { postOnCreate } = require('./posts');
const { searchTags } = require('./search');

exports.next = next;
exports.postOnCreate = postOnCreate;
exports.searchTags = searchTags;
