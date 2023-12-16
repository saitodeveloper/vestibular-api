const repository = require('./repository')

const createQuestion = async question => {
    const { alternatives } = question
    return await repository.insertQuestion(question, alternatives)
}

const searchQuestion = async searchParam => {
    const { limit, page } = searchParam
    const search = { limit, offset: page - 1 }
    return await repository.searchQuestion(search)
}

const searchQuestionById = async id => {
    const search = { limit: 1, offset: 0, id }
    const found = await repository.searchQuestion(search)
    return found?.results?.at(0)
}

module.exports = { createQuestion, searchQuestion, searchQuestionById }
