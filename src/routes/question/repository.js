const { db, errors } = require('../../shared')

const { InsertQuestionError } = errors.system

const insertQuestion = async (question, alternatives) => {
    const { statement, institution, year, examName } = question
    const result = await db.mysql.query(
        'CALL `insert_question`(?, ?, ?, ?, ?, ?);',
        [
            statement,
            institution,
            year,
            examName,
            question.enum,
            JSON.stringify(alternatives)
        ]
    )

    if (!Array.isArray(result) && !result.affectedRows)
        throw new InsertQuestionError()

    const resultQuestion = result?.at(0)?.at(0)
    const resultAlternatives = result?.at(1).map(item => {
        item.correct = item.correct === 1
        return item
    })

    return { ...resultQuestion, alternatives: resultAlternatives }
}

const searchQuestion = async search => {
    const { id, limit, offset } = search
    const result = await db.mysql.query(
        'CALL `search_question_inclusive`(?, ?, ?, ?, ?, ?, ?, ?);',
        [id, null, null, null, null, null, limit, offset]
    )

    if (!Array.isArray(result) && !result.affectedRows)
        throw new InsertQuestionError()

    const resultTotal = result?.at(0)?.at(0)
    const results = result?.at(1)

    return { ...resultTotal, results }
}

module.exports = { insertQuestion, searchQuestion }
