const { db, token, errors } = require('../../shared')

const { AuthError } = errors.system
const { redis } = db

const create = async (
    userId,
    deviceName,
    deviceSerial,
    authToken,
    userToken
) => {
    const client = redis.instance()
    await client.connect()
    const exists = await client.hGet(
        `user:${userId}:tokens`,
        `${deviceName}:serial:${deviceSerial}`
    )

    if (exists) {
        await client.del(`token:${exists}`)
    }

    await client.hSet(
        `user:${userId}:tokens`,
        `${deviceName}:serial:${deviceSerial}`,
        authToken
    )
    await client.set(`token:${authToken}`, userToken)
    await client.quit()
}

const clean = async authToken => {
    const client = redis.instance()
    await client.connect()
    const userToken = await client.get(`token:${authToken}`)

    if (!userToken) throw new AuthError()

    const payload = token.payload(userToken)
    const tokens = await client.hGetAll(`user:${payload.userId}:tokens`)

    for (const token of Object.values(tokens)) {
        await client.del(`token:${token}`)
    }

    await client.del(`user:${payload.userId}:tokens`)
    await client.quit()
}

const find = async (context, key) => {
    const client = redis.instance()
    await client.connect()
    const value = await client.get(`${context}:${key}`)
    await client.quit()
    return value
}

module.exports = {
    clean,
    create,
    find
}
