const { db, errors } = require('../../shared')

const { InsertActivityError } = errors.system

const insertActivity = async (activity, auth) => {
    const { idAlternative, idQuestion  } = activity
    const { userId, deviceSerial, deviceId } = auth
    const result = await db.mysql.query(
        'CALL `insert_activity`(?, ?, ?, ?, ?)',
        [
            idAlternative,
            userId,
            deviceId,
            deviceSerial,
            idQuestion
        ]
    )

    if (!Array.isArray(result) && !result.affectedRows)
        throw new InsertActivityError()

    return result?.at(0)?.at(0)
}

module.exports = { insertActivity }
