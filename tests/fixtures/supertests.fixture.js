const supertest = require('supertest')

const app = require('../../src/app')

module.exports = {
    /** @type {supertest.SuperTestStatic} */
    request: supertest(app)
}
