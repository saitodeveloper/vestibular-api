const { createClient } = require('redis')
const env = require('./environment')

const getRedisUrl = () => {
    const REDIS_USER = env.getString('REDIS_USER', '')
    const REDIS_PASS = env.getString('REDIS_PASS', '')
    const REDIS_HOST = env.getString('REDIS_HOST', '')
    const REDIS_PORT = env.getString('REDIS_PORT', '')
    return `redis://${REDIS_USER}:${REDIS_PASS}@${REDIS_HOST}:${REDIS_PORT}`
}

const instance = () => {
    return createClient({ legacyMode: false, url: getRedisUrl() })
}

module.exports = { instance }
