/** @type {import('jest').Config} */
const config = {
    verbose: true,
    testTimeout: 20000,
    testEnvironment: 'node',
    setupFiles: ['<rootDir>/scripts/integration.setup.js'],
    globalTeardown: '<rootDir>/scripts/integration.setup.teardown.js'
}

module.exports = config
