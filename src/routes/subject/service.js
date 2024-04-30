const repository = require('./repository')

const createSubjects = subjects => repository.insertSubjects(subjects)
const searchSubjects = search => {
    const { page, limit } = search
    const searchSubject = { ...search, page, offset: (page - 1) * limit }

    return repository.searchSubjects(searchSubject)
}

module.exports = { createSubjects, searchSubjects }
