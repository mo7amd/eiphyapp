const withSass = require('@zeit/next-sass');
const withPurgeCss = require('next-purgecss');

module.exports = withSass(withPurgeCss({
  target: 'experimental-serverless-trace',
  purgeCss: {
    whitelist: ['body', 'html', '__next'],
    whitelistPatterns: ['bm-*'],
  },
  purgeCssEnabled: ({ dev, isServer }) => (!dev && !isServer),
  env: {
    MAX_FILE_SIZE: 5,
    IMG_PREVIEW: 'ImgPreview',
  },
}));
