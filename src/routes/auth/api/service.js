const { v4: uuidv4 } = require('uuid')
const repository = require('./repository')
const crypt = require('../crypt')
const session = require('../session')
const { token, errors } = require('../../../shared')
const { mapKeys, camelCase } = require('lodash')

const { AuthError } = errors.system

const createUser = async (user, auth, device) => {
    const { password, email } = auth
    const hash = await crypt.hashSaltEncode(password)
    const userRepositoryInput = {
        role: 'user',
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

const login = async (auth, device) => {
    const userWithAuth = await repository.findUserWithAuth(auth.email, device)

    if (!userWithAuth?.userId) {
        throw new AuthError()
    }

    const validCredentials = await crypt.isHashEqual(
        auth.password,
        userWithAuth.authHash
    )

    if (!validCredentials) {
        throw new AuthError()
    }

    delete userWithAuth.authHash
    const userToken = token.generate(userWithAuth)
    const authToken = token.generateExpiredToken({ seed: uuidv4() })
    const refreshToken = token.generate({ seed: uuidv4() })
    const { userId } = userWithAuth
    const { serial, device: deviceName } = device
    await session.create(userId, deviceName, serial, authToken, userToken)

    return { authToken, refreshToken }
}

const otp = async () => {
    const [key, otp, iv] = crypt.generateOtp()
    await repository.cacheOtpKey(key, otp, iv)

    return { otp: `${key}:${otp}:${iv}` }
}

module.exports = {
    createUser,
    login,
    otp
}
