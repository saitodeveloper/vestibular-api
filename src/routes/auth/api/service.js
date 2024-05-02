const { v4: uuidv4 } = require('uuid')
const repository = require('./repository')
const crypt = require('../crypt')
const session = require('../session')
const { token, errors } = require('../../../shared')
const { mapKeys, camelCase } = require('lodash')

const { AuthError } = errors.system

const createUser = async (user, auth, device, role = 'user') => {
    const { password, email } = auth
    const hash = await crypt.hashSaltEncode(password)
    const userRepositoryInput = {
        role,
        ...user
    }
    const authRepositoryInput = {
        hash,
        identity: email,
        type: 'email'
    }

    const userRepository = await repository.createUser(
        userRepositoryInput,
        authRepositoryInput,
        device
    )

    return mapKeys(userRepository, (_, key) => camelCase(key))
}

const generateToken = async (payload, device) => {
    const userToken = token.generate(payload)
    const authToken = token.generateExpiredToken({ seed: uuidv4() })
    const refreshToken = token.generate({ seed: uuidv4() })
    const { userId } = payload
    const { serial, type } = device
    await session.create(
        userId,
        type,
        serial,
        authToken,
        userToken,
        refreshToken
    )

    return { authToken, refreshToken }
}

const login = async (auth, device) => {
    const { email: identityValue, password } = auth
    const userWithAuth = await repository.loginUser(
        { identityValue, password },
        device
    )

    if (!userWithAuth?.authorized) throw new AuthError()

    delete userWithAuth.authorized
    delete userWithAuth.newDeviceAdded

    return generateToken(userWithAuth, device)
}

const refreshLogin = async (auth, device, tokens) => {
    const { userId, role } = auth
    const { authToken, refreshToken } = tokens
    const foundRefreshToken = await repository.findRefreshToken(authToken)

    if (refreshToken !== foundRefreshToken) throw new AuthError()

    return generateToken({ userId, role, deviceSerial: device.serial }, device)
}

const otp = async () => {
    const [key, otp, iv] = crypt.generateOtp()
    await repository.cacheOtpKey(key, otp, iv)

    return { otp: `${key}:${otp}:${iv}` }
}

module.exports = {
    createUser,
    refreshLogin,
    login,
    otp
}
