// jest.config.js
module.exports = {
  rootDir: './',
  globals: {
    __DEV__: true,
    __PROD__: false
  },
  testEnvironment: 'node',
  preset: "ts-jest",
  verbose: true, // report individual test
  bail: false, // enable to stop test when an error occur,
  detectOpenHandles: false,
  moduleDirectories: ['node_modules', 'src', 'test'],
  testMatch: ['**/test/**/*.test.ts?(x)'],
  testPathIgnorePatterns: ['node_modules/', 'dist/', '.json'],
  collectCoverageFrom: [
    'src/**/*.ts'
  ],
  coverageThreshold: {
    // coverage strategy
    global: {
      branches: 80,
      functions: 80,
      lines: 50,
      statements: -10
    }
  }
};