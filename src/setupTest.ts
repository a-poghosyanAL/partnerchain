import '@testing-library/jest-dom';

// Mock CSS modules
const mockCssModules = require('identity-obj-proxy');
jest.mock('^.+\\.module\\.(css|sass|scss)$', () => mockCssModules);

// Mock non-CSS modules
jest.mock('./path/to/non-css/module', () => 'mocked-value');