const { db, errors } = require('../../shared')

const { InsertActivityError } = errors.system

const insertActivity = async (activity) => {
    const { idAlternative, user_id, device_id, device_serial, idQuestion,  } = activity
    const result = await db.mysql.query(
        'CALL `insert_activity`(?, ?, ?, ?, ?)',
        [
            idAlternative,
            user_id,
            device_id,
            device_serial,
            idQuestion
        ]
    )

    if (!Array.isArray(result) && !result.affectedRows)
        throw new InsertActivityError()

    console.log(result)
    return result
}

module.exports = { insertActivity }