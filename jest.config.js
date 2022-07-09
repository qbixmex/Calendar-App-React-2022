module.exports = {
  testEnvironment: 'jest-environment-jsdom',
  setupFiles: ['./jest.setup.js'],
  transformIgnorePatterns: [],
  
  // ModuleNameMapper if we need to import CSS in our components
  moduleNameMapper: {
      '\\.(css|sass|scss|less)$': '<rootDir>/tests/mocks/styleMock.js',
  },
}