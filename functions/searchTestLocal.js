const index = require('flexsearch').create({
  profile: 'balance',
});


const searchParam = 'mer';
const strings = ['ad',
  'asd',
  'asdf',
  'dfgdfgdfgdf',
  'dsfgdfgdfgdfg',
  'fgjhfg',
  'merquant-zero-commission',
  'merquant-commission',
  'merquant-zero-cnmnmommission',
  'merquant-',
  'rubikal',
  'sdfdsf',
  'free',
  'free room nerom',
  'sdfdsfdsfsd',
  'sdfsdf',
  'sdsd'];

for (let i = 0, len = strings.length; i < len; i++) {
  index.add(i, strings[i]);
}

// index.add(strings);
const results = index.search(searchParam, 10);
for (let i = 0, len = results.length; i < len; i++) {
  console.log(strings[results[i]]);
}
