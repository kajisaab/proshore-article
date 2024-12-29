/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  transform: {
    '^.+\\.tsx?$': 'ts-jest', // Use ts-jest to transform TypeScript files
  },
  transformIgnorePatterns: ['node_modules/(?!.*\\.mjs$)'], // Allow ESM in node_modules
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'], // Recognize TypeScript and JS files
  testMatch: ['<rootDir>/test/**/*.spec.ts'], // Pattern for test files
  moduleNameMapper: {
    '^@config/(.*)$': '<rootDir>/src/config/$1',
    '^@core/(.*)$': '<rootDir>/src/core/$1',
    '^@feature/(.*)$': '<rootDir>/src/feature/$1',
    '^@common/(.*)$': '<rootDir>/src/common/$1'
  }
};

export default config;
