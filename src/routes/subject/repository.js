const { db, errors } = require('../../shared')
const { InsertSubjectsError } = errors.system

const insertSubjects = async (subjects) => {
    const result = await db.mysql.query(
        'CALL `insert_subjects`(?);',
        [JSON.stringify(subjects)]
    )

    if (!Array.isArray(result) && !result.affectedRows)
        throw new InsertSubjectsError()


    return { subjectInserted: result.affectedRows }
}

module.exports = { insertSubjects }
