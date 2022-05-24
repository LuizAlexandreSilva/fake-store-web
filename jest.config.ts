import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  verbose: true,
  resetMocks: false,
  transform: {
    '^.+\\.(ts|tsx|js|jsx)$': 'ts-jest',
  },
  testEnvironment: 'jsdom',
  testPathIgnorePatterns: ['/node_modules/', 'src/__tests__/**/*.ts'],
};

export default config;
