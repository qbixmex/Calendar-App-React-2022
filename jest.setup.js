// In case find packages that need them.
// Add this package: yarn add -D setimmediate
// import 'setimmediate';

require('dotenv').config({
  path: '.env.test'
});

jest.mock('./src/helpers/getEnvVariables', () => ({
  getEnvVariables: () => ({ ...process.env })
}));
