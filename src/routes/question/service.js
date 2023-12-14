const repository = require('./repository')

const createQuestion = async question => {
    const { alternatives } = question
    return await repository.insertQuestion(question, alternatives)
}

module.exports = { createQuestion }
