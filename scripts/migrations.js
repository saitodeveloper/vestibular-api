const mysql = require('mysql2')
const migration = require('mysql-migrations')
const path = require('path')
const dotenv = require('dotenv')

const migrationFolder = path.join(__dirname, 'migrations')
dotenv.config()

const connection = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    port: process.env.MYSQL_PORT,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
})

migration.init(connection, migrationFolder)
