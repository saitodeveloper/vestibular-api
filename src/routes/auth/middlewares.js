const { errors, token, db } = require('../../shared')
const { decryptAES } = require('./crypt')
const session = require('./session')

const { ForbidenError, UnauthorizedError } = errors.http

const auth = async (req, _res, next) => {
    try {
        const authToken = token.encodedPayload(req.headers.authorization)
        const userToken = await session.find('token', authToken)
        const decoded = token.verify(userToken)

        if (!req.context) req.context = {}
        req.context.auth = decoded

        next()
    } catch (error) {
        next(new UnauthorizedError())
    }
}

const role = list => (req, _res, next) => {
    const role = req.auth.authRole
    const hasRole = list.includes(role)

    if (hasRole) {
        next()
    } else {
        next(new ForbidenError())
    }
}

const decryptDevice = async (req, _res, next) => {
    try {
        const { device: encryptDevice, otpkey } = req.headers
        const client = db.redis.instance()
        await client.connect()
        const password = await client.get(`otp:${otpkey}`)
        const deviceJSON = decryptAES(encryptDevice, password)

        if (!req.context) req.context = {}
        req.context.device = JSON.parse(deviceJSON)
        next()
    } catch {
        next(new UnauthorizedError())
    }
}

module.exports = { auth, decryptDevice, role }
