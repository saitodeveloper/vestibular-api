const { db, errors, caseConverter } = require('../../shared')

const { InsertQuestionError } = errors.system

const insertQuestion = async question => {
    const {
        statement,
        institution,
        year,
        examName,
        alternatives,
        subjects = []
    } = question
    const result = await db.mysql.query(
        'CALL `insert_question`(?, ?, ?, ?, ?, ?, ?);',
        [
            statement,
            institution,
            year,
            examName,
            question.enum,
            JSON.stringify(alternatives),
            JSON.stringify(subjects)
        ]
    )

    if (!Array.isArray(result) && !result.affectedRows)
        throw new InsertQuestionError()

    const resultQuestion = result?.at(0)?.at(0)
    const resultAlternatives = result?.at(1).map(item => {
        item.correct = item.correct === 1
        return item
    })
    const resultSubjects = result?.at(2) ?? []

    return {
        ...resultQuestion,
        alternatives: resultAlternatives,
        subjects: resultSubjects
    }
}

const searchQuestion = async search => {
    const { id, limit, offset } = search
    const dbResult = await db.mysql.query(
        'CALL `search_question_inclusive`(?, ?, ?, ?, ?, ?, ?, ?);',
        [id, null, null, null, null, null, limit, offset]
    )

    if (!Array.isArray(dbResult) && !dbResult.affectedRows)
        throw new InsertQuestionError()

    const resultTotal = dbResult?.at(0)?.at(0)
    let results = dbResult?.at(1)

    results = results
        .map(question => {
            questionCamelCase = caseConverter.converter(question)
            return questionCamelCase
        })
        .reduce((reducer, question) => {
            const {
                questionId,
                questionStatement,
                questionCreatedAt,
                questionUpdatedAt,
                institution,
                year,
                alternativeId,
                alternativeStatement,
                alternativeCreatedAt,
                alternativeUpdatedAt,
                subjectId,
                subjectCreatedAt,
                subjectUpdatedAt,
                parent,
                name,
                correct
            } = question
            if (!reducer[questionId]) {
                reducer[questionId] = {
                    id: questionId,
                    statement: questionStatement,
                    createdAt: questionCreatedAt,
                    updatedAt: questionUpdatedAt,
                    institution,
                    year,
                    enum: question.enum,
                    alternatives: [],
                    subjects: []
                }
            }
            const alreadyAddedAlternative = reducer[
                questionId
            ].alternatives.some(item => item.id === alternativeId)
            const alreadyAddedSubject = reducer[questionId].subjects.some(
                item => item.id === subjectId
            )

            if (!alreadyAddedAlternative)
                reducer[questionId].alternatives.push({
                    id: alternativeId,
                    statement: alternativeStatement,
                    createdAt: alternativeCreatedAt,
                    updatedAt: alternativeUpdatedAt,
                    correct: correct === 1
                })

            if (!alreadyAddedSubject)
                reducer[questionId].subjects.push({
                    id: subjectId,
                    parent,
                    name,
                    createdAt: subjectCreatedAt,
                    updatedAt: subjectUpdatedAt
                })

            return reducer
        }, {})

    return { ...resultTotal, results: Object.values(results) }
}

module.exports = { insertQuestion, searchQuestion }
