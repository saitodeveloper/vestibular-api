const commonMigration = require('../scripts/migration.mysql.common')(
    __filename,
    __dirname
)
module.exports = { ...commonMigration }
