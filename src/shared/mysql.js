const mysql = require('mysql2')
const env = require('./environment')
const pool = mysql.createPool({
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
})

const query = (sql, values) =>
    new Promise((resolve, reject) => {
        pool.query(sql, values, (error, result) => {
            if (error) reject(error)
            resolve(result)
        })
    })

module.exports = { pool, query }
