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

    const insertedUser = result[0][0]
    const insertedDevice = result[1][0]
    const insertedIdentity = result[2][0]

    return {
        user: insertedUser,
        device: insertedDevice,
        identity: insertedIdentity
    }
}

const findUserWithAuth = async (key, deviceRepository) => {
    return {}
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
    findUserWithAuth
}
