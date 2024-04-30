const { db, errors } = require('../../shared')
const { InsertSubjectsError } = errors.system

const insertSubjects = async subjects => {
    const result = await db.mysql.query('CALL `insert_subjects`(?);', [
        JSON.stringify(subjects)
    ])

    if (!Array.isArray(result) && !result.affectedRows)
        throw new InsertSubjectsError()

    return { subjectsInserted: result.affectedRows }
}

const searchSubjects = async searchSubjects => {
    const { name, limit, offset } = searchSubjects
    const dbResult = await db.mysql.query('CALL `search_subjects`(?, ?, ?);', [
        name,
        limit,
        offset
    ])

    const total = dbResult?.at(0)?.at(0)?.total
    const results = dbResult?.at(1) ?? []

    return { total, results }
}

module.exports = { insertSubjects, searchSubjects }
