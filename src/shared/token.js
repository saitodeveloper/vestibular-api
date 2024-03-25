const jwt = require('jsonwebtoken')
const env = require('./environment')

const getJwtExpiresIn = () => env.getString('JWT_EXPIRES_IN', '1h')
const getJwtPrivateKey = () => env.getString('JWT_PRIVATE_KEY', undefined)

const generate = (obj, options = {}) =>
    jwt.sign(obj, getJwtPrivateKey(), options)
const generateExpiredToken = obj =>
    generate(obj, { expiresIn: getJwtExpiresIn() })

const getBearerToken = token => {
    const parts = token.split(' ')
    const isBearerToken = parts.length === 2 && token.indexOf('Bearer') === 0

    if (!isBearerToken) throw new Error('invalid bearer token')

    return parts[1]
}

const getPayload = token => {
    try {
        const parts = token.split('.')
        const base64 = parts[1]
        const json = Buffer.from(base64, 'base64').toString()
        return JSON.parse(json)
    } catch {
        throw new Error('invalid bearer token')
    }
}

const verify = token => {
    return payload(token)
}

const payload = token => jwt.verify(token, getJwtPrivateKey())

module.exports = {
    getBearerToken,
    getPayload,
    generate,
    generateExpiredToken,
    payload,
    verify
}
