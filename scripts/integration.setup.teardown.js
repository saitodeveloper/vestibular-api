const mysql = require('mysql2')
const dotenv = require('dotenv')

const env = require('../src/shared/environment')

dotenv.config()

const getMySqlOptions = () => {
    return {
        host: env.getString('MYSQL_HOST'),
        user: 'root',
        password: env.getString('MYSQL_ROOT_PASSWORD'),
        waitForConnections: true,
        connectionLimit: 10,
        maxIdle: 10,
        idleTimeout: 60000,
        enableKeepAlive: true,
        keepAliveInitialDelay: 0
    }
}

const query = (sql, values) =>
    new Promise((resolve, reject) => {
        mysql
            .createConnection(getMySqlOptions())
            .query(sql, values, (error, result) => {
                if (error) reject(error)
                resolve(result)
            })
    })

module.exports = async () => {
    process.env.MYSQL_DATABASE = process.env.MYSQL_DATABASE + '_test'
    await query(`DROP SCHEMA IF EXISTS \`${process.env.MYSQL_DATABASE}\``)
}
