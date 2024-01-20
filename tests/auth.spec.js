const { request } = require('../tests/fixtures/supertests.fixture')

describe('Integration tests /v1/auth', () => {
    it('GET /v1/auth/otp should return a otp', async () => {
        const { body } = await request
            .get('/v1/auth/otp')
            .expect('Content-Type', /json/)
            .expect(200)

        expect(body).toHaveProperty('otp')
        expect(body.otp.split(':').length).toBe(3)
    })
})
