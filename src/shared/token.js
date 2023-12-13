const jwt = require('jsonwebtoken')
const env = require('./environment')

const getJwtExpiresIn = () => env.getString('JWT_EXPIRES_IN', '1h')
const getJwtPrivateKey = () => env.getString('JWT_PRIVATE_KEY', undefined)

const generate = (obj, options = {}) =>
    jwt.sign(obj, getJwtPrivateKey(), options)
const generateExpiredToken = obj =>
    generate(obj, { expiresIn: getJwtExpiresIn() })

const encodedPayload = token => {
    const parts = token.split(' ')
    const isBearerToken = parts.length === 2 && token.indexOf('Bearer') === 0

    if (!isBearerToken) throw new Error('invalid bearer token')

    return parts[1]
}

const verify = token => {
    return payload(token)
}

const payload = token => jwt.verify(token, getJwtPrivateKey())

module.exports = {
    encodedPayload,
    generate,
    generateExpiredToken,
    payload,
    verify
}
