const repository = require('./repository')

const createSubjects = subjects => repository.insertSubjects(subjects)

module.exports = { createSubjects }