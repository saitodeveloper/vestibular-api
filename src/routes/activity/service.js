const repository = require('./repository')

const createActivity = async activity => {
    const auth = { userId: 1, deviceId: 1, deviceSerial: 'some_serial' }
    return await repository.insertActivity(activity, auth)
}

module.exports = { createActivity }
