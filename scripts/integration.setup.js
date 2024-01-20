const mysql = require('mysql2')
const dotenv = require('dotenv')
const { spawnSync } = require('child_process')

const env = require('../src/shared/environment')

dotenv.config()

const shared = require('../src/shared')
const { redis } = shared.db
let pool

const execShellCommand = (execPath, params) => {
    const { platform } = process
    let fullPath = execPath

    if (platform === 'win32') fullPath += '.cmd'

    spawnSync(fullPath, params, { stdio: 'inherit' })
}

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

const end = () =>
    new Promise((resolve, reject) => {
        pool.end(error => {
            if (error) reject(error)
            resolve(result)
        })
    })

module.exports = async () => {
    process.env.MYSQL_DATABASE = process.env.MYSQL_DATABASE + '_test'
    process.env.REDIS_DB_NUM = 1

    await query(
        `CREATE SCHEMA IF NOT EXISTS \`${process.env.MYSQL_DATABASE}\`;`
    )
    await query(
        `CREATE USER IF NOT EXISTS 'devadmin'@'localhost' IDENTIFIED BY 'devadmin';`
    )
    await query(`GRANT ALL PRIVILEGES ON *.* TO 'devadmin'@'localhost';`)
    await query(`GRANT ALL PRIVILEGES ON *.* TO 'devadmin'@'%';`)

    execShellCommand('npm', ['run', 'migrate', '--', 'up', '-e', 'test'])
    execShellCommand('npm', ['run', 'init:seed'])
}

module.exports.teardown = async () => {
    await query(`DROP SCHEMA IF EXISTS \`${process.env.MYSQL_DATABASE}\``)
    await end()
}
