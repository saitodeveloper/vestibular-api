const repository = require('./repository')

const createActivity = async activity => {
    return await repository.insertActivity(activity)
}

module.exports = { createActivity }