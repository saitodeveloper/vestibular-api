const { errors, token, db } = require('../../shared')
const { decryptAES } = require('./crypt')
const session = require('./session')

const { ForbidenError, UnauthorizedError } = errors.http
const { UnparsableToken, InvalidDevice } = errors.system

const decodeAuth = async (req, _res, next) => {
    const { authorization: headerAuth } = req.headers
    const { Authorization: cookieAuth } = req.cookies
    let authorization = headerAuth || cookieAuth

    if (!authorization) return next()

    try {
        const authToken = token.getBearerToken(authorization)
        const userToken = await session.find('token', authToken)
        const decoded = token.getPayload(userToken)
        if (!req.context) req.context = {}
        req.context.auth = decoded
        next()
    } catch {
        next(new UnparsableToken())
    }
}

const refreshAuthorized = (originalUrl, authToken) => {
    try {
        token.verify(authToken)
        return true
    } catch (error) {
        if (
            error.name === 'TokenExpiredError' &&
            originalUrl === '/v1/auth/refresh'
        ) {
            return false
        } else throw error
    }
}

const auth = async (req, _res, next) => {
    try {
        const { authorization: headerAuth, refresh } = req.headers
        const { Authorization: cookieAuth, Refresh } = req.cookies
        const authorization = headerAuth || cookieAuth
        const refreshToken = refresh || Refresh
        const authToken = token.getBearerToken(authorization)

        refreshAuthorized(req.originalUrl, authToken)

        const userToken = await session.find('token', authToken)
        const decoded = token.verify(userToken)

        if (!req.context) req.context = {}

        req.context.auth = decoded
        req.context.tokens = { authToken, refreshToken }

        next()
    } catch (error) {
        next(new UnauthorizedError())
    }
}

const role = list => (req, _res, next) => {
    const role = req.context?.auth?.role
    const hasRole = list.includes(role)

    if (hasRole) {
        next()
    } else {
        next(new ForbidenError())
    }
}

const decryptDevice = async (req, _res, next) => {
    try {
        let device, otpKey
        const { Device: cookieDevice, OtpKey: cookieOtpKey } = req.cookies
        const { device: headerDevice, optKey: headerOptKey } = req.headers

        device = cookieDevice || headerDevice
        otpKey = cookieOtpKey || headerOptKey

        const client = await db.redis.instance()
        await client.connect()
        const password = await client.get(`otp:${otpKey}`)
        const deviceJSON = decryptAES(device, password)

        if (!req.context) req.context = {}
        req.context.device = JSON.parse(deviceJSON)
        next()
    } catch {
        next(new InvalidDevice())
    }
}

module.exports = { auth, decodeAuth, decryptDevice, role }
