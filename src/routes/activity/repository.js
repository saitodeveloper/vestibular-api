const { db, errors } = require('../../shared')

const { InsertActivityError } = errors.system

const insertActivity = async (activity, auth) => {
    const { alternativeId, questionId } = activity
    const { userId, deviceSerial, deviceId } = auth
    const result = await db.mysql.query(
        'CALL `insert_activity`(?, ?, ?, ?, ?);',
        [alternativeId, userId, deviceId, deviceSerial, questionId]
    )

    if (!Array.isArray(result) && !result.affectedRows)
        throw new InsertActivityError()

    return result
        ?.at(0)
        ?.map(resultItem => {
            resultItem.isAnswerCorrect = resultItem.isAnswerCorrect === 1
            return resultItem
        })
        ?.at(0)
}

module.exports = { insertActivity }
