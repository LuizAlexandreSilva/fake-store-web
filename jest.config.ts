import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  verbose: true,
  resetMocks: false,
  transform: {
    '^.+\\.(ts|tsx|js|jsx)$': 'ts-jest',
  },
  testEnvironment: 'jsdom',
};

export default config;
