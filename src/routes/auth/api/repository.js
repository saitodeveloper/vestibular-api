const { db, errors } = require('../../../shared')

const { InsertUserAuthError } = errors.system

const createUser = async (user, auth, device) => {
    const { firstName, lastName, role } = user
    const { hash, identity, type: authType } = auth
    const { serial, type: deviceType } = device

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

    if (!Array.isArray(result) && !result.affectedRows)
        throw new InsertUserAuthError()

    const insertedUser = result?.at(0)?.at(0)
    const insertedDevice = result?.at(1)?.at(0)
    const insertedIdentity = result?.at(2)?.at(0)

    return {
        user: insertedUser,
        device: insertedDevice,
        identity: insertedIdentity
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
    const client = db.redis.instance()
    await client.connect()
    await client.setEx(`otp:${key}`, 10, `${password}.${iv}`)
    await client.quit()
}

module.exports = {
    cacheOtpKey,
    createUser,
    loginUser
}
