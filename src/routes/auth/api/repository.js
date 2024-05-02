const { db, errors } = require('../../../shared')

const { InsertUserAuthError, DuplicateUserError } = errors.system

const createUser = async (user, auth, device) => {
    const { firstName, lastName, role } = user
    const { hash, identity, type: authType } = auth
    const { serial, type: deviceType } = device

    try {
        const result = await db.mysql.query(
            'CALL `insert_user`(?, ?, ?, ?, ?, ?, ?, ?);',
            [
                firstName,
                lastName,
                role,
                authType,
                identity,
                hash,
                deviceType,
                serial
            ]
        )
        const insertedUser = result?.at(0)?.at(0)
        const insertedDevice = result?.at(1)?.at(0)
        const insertedIdentity = result?.at(2)?.at(0)

        return {
            user: insertedUser,
            device: insertedDevice,
            identity: insertedIdentity
        }
    } catch (error) {
        if (error.code === 'ER_DUP_ENTRY') throw new DuplicateUserError(error)
        else throw new InsertUserAuthError()
    }
}

const loginUser = async (identity, device) => {
    const { serial, type } = device
    const { identityValue, password } = identity
    const result = await db.mysql.query('CALL `login_user`(?, ?, ?, ?);', [
        identityValue,
        password,
        type,
        serial
    ])

    return result?.at(0)?.at(0)
}

const cacheOtpKey = async (key, password, iv) => {
    const client = await db.redis.instance()
    await client.connect()
    await client.setEx(`otp:${key}`, 10, `${password}.${iv}`)
    await client.quit()
}

const findRefreshToken = async authToken => {
    let refreshToken = null
    const client = await db.redis.instance()
    await client.connect()
    refreshToken = await client.get(`refresh:${authToken}`)
    await client.quit()
    return refreshToken
}

module.exports = {
    cacheOtpKey,
    createUser,
    loginUser,
    findRefreshToken
}
