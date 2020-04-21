const withSass = require('@zeit/next-sass');
const withPurgeCss = require('next-purgecss');

module.exports = withSass(withPurgeCss({
  purgeCssEnabled: ({ dev, isServer }) => (!dev && !isServer),
  env: {
    MAX_FILE_SIZE: 5,
  },
}));
