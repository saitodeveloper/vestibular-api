const mysql = require('mysql2')
const env = require('./environment')
let pool

const getMySqlOptions = () => {
    return {
        host: env.getString('MYSQL_HOST'),
        user: env.getString('MYSQL_USER'),
        database: env.getString('MYSQL_DATABASE'),
        password: env.getString('MYSQL_PASSWORD'),
        waitForConnections: true,
        connectionLimit: 10,
        maxIdle: 10,
        idleTimeout: 60000,
        enableKeepAlive: true,
        keepAliveInitialDelay: 0
    }
}

const getPool = () => {
    if (!pool) pool = mysql.createPool(getMySqlOptions())
    return pool
}

const query = (sql, values) =>
    new Promise((resolve, reject) => {
        getPool().query(sql, values, (error, result) => {
            if (error) reject(error)
            resolve(result)
        })
    })

module.exports = { pool, query }
