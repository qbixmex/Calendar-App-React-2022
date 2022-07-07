# Installing and configuring Jest + React Testing Library

## In React + Vite  projects

1. Installing:

```
yarn add --dev \
jest \
babel-jest \
@babel/preset-env \
@babel/preset-react \
@testing-library/react \
@types/jest \
jest-environment-jsdom
```

2. Optional: If you need to Fetch API in the project:

```(NOTE: if you are using axios do not install this package)```

```
yarn add --dev whatwg-fetch
```

3. Update scripts:

__package.json__
```
"scripts: {
  ...
  "test": "jest"
```

4. Create Babel configuration:

__babel.config.js__
```
module.exports = {
    presets: [
        [ '@babel/preset-env', { targets: { esmodules: true } } ],
        [ '@babel/preset-react', { runtime: 'automatic' } ],
    ],
};
```

5. For component that need to import CSS, create a file called:

```tests/mocks/styleMock.js```
```
module.exports = {};
```

6. Optional: create Jest config and setup:

__jest.config.js__
```
module.exports = {
    testEnvironment: 'jest-environment-jsdom',
    setupFiles: ['./jest.setup.js'],
    transformIgnorePatterns: [],
    
    // ModuleNameMapper if we need to import CSS in our components
    moduleNameMapper: {
        '\\.(css|less)$': '<rootDir>/tests/mocks/styleMock.js',
    },
}
```
7. Optional: additional jest configuration:

__jest.setup.js__
```
// In case wee need to implement FetchAPI (Note: NODE 18 not need this)
yarn add -D whatwg-fetch
import 'whatwg-fetch'; 

// In case find packages that need them.
// Add this package: yarn add -D setimmediate
import 'setimmediate';

// In case we have environment variables and
// does not support import.meta.env
// Add this package: yarn add -D dotenv
require('dotenv').config({
    path: '.env.test'
});

Make complete environment variables mock into your tests:

jest.mock('./src/helpers/getEnvVariables', () => ({
    getEnvVariables: () => ({ ...process.env })
}));
```
