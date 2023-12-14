'use strict'

const fs = require('fs')
const path = require('path')

const generateMigration = (filename, dirname) => {
    const basename = path.basename(filename, '.js')
    const sqlUpPath = path.join(
        dirname,
        '..',
        'migrations.sqls',
        `${basename}.up.sql`
    )
    const sqlDownPath = path.join(
        dirname,
        '..',
        'migrations.sqls',
        `${basename}.down.sql`
    )
    const sqlUp = fs.readFileSync(sqlUpPath, { encoding: 'utf-8' })
    const sqlDown = fs.readFileSync(sqlDownPath, { encoding: 'utf-8' })
    let dbm
    let type
    let seed

    /**
     * We receive the dbmigrate dependency from dbmigrate initially.
     * This enables us to not have to rely on NODE_PATH.
     */
    const setup = (options, seedLink) => {
        dbm = options.dbmigrate
        type = dbm.dataType
        seed = seedLink
    }

    const up = db => db.runSql(sqlUp)

    const down = db => db.runSql(sqlDown)

    const _meta = {
        version: 1
    }
    return { setup, down, up, _meta }
}

module.exports = generateMigration
