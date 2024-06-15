module.exports = {
    moduleNameMapper: {
      '^src/(.*)$': '<rootDir>/src/$1',
    },
    testRegex: '.*\\.spec\\.ts$',
    transform: {
      '^.+\\.(t|j)s$': 'ts-jest',
    },
    collectCoverageFrom: [
      '**/*.(t|j)s',
      '!**/node_modules/**',
      '!**/dist/**',
      '!**/build/**',
      '!**/test/**',
      '!**/coverage/**',
      '!**/jest.config.js',
      '!**/tsconfig*.json',
      '!**/.eslintrc.js',
      //ignore *.sp_ec.ts files
      '!**/*.sp_ec.ts',
      //ignore *e2e.spec.ts files
      '!**/*.e2e.spec.ts',
      // Добавьте здесь другие директории, которые следует исключить
    ],
    coverageDirectory: './coverage',
    testEnvironment: 'node',
  };
  