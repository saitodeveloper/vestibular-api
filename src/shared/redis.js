const { createClient } = require('redis')
const env = require('./environment')

const getRedisUrl = () => {
    const REDIS_USER = env.getString('REDIS_USER')
    const REDIS_PASS = env.getString('REDIS_PASS')
    const REDIS_HOST = env.getString('REDIS_HOST')
    const REDIS_PORT = env.getString('REDIS_PORT')
    return `redis://${REDIS_USER}:${REDIS_PASS}@${REDIS_HOST}:${REDIS_PORT}`
}

const instance = async () => {
    const dbNum = env.getInteger('REDIS_DB_NUM')
    const client = createClient({ legacyMode: false, url: getRedisUrl() })

    if (dbNum != 0) client.on('connect', async () => await client.select(dbNum))

    return client
}

module.exports = { instance }
