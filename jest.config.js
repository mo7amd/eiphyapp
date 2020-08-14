module.exports = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
  testURL: 'http://localhost:2021/',
  moduleNameMapper: {
    '\\.(scss|css)$': '<rootDir>/node_modules/jest-css-modules',
  },
  snapshotSerializers: ['jest-serializer-html'],
};
