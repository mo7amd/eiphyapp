const sharp = require('sharp');
const { execFile } = require('child_process');
const gifsicle = require('gifsicle');

execFile(gifsicle, ['--resize-fit', '100x100', '-o', 'output.gif', 'output.gif'], (err) => {
  console.log(err);
  console.log('Image minified!');
});

sharp('lindys.jpg')
  .resize({ width: 300, height: 300, fit: 'inside' })
  .toFile('output.jpg');
