const dotenv = require('dotenv')
dotenv.config()

const userService = require('../src/routes/auth/api/service')
const subjectRepository = require('../src/routes/subject/repository')
const env = require('../src/shared/environment')
const { v4: uuidv4 } = require('uuid')
const subjectData = require('./subject.data.json')

const rootUserJson = env.getString('ROOT_USER_JSON')
const allowSeed = env.getBoolean('ALLOW_SEED', false)

if (!allowSeed) return console.warn('Not allwoed to seed')

const rootUserObj = JSON.parse(rootUserJson)
const { platform } = process

const { user, auth } = rootUserObj
const device = { type: platform, serial: uuidv4() }

const promiseUser = userService
    .createUser(user, auth, device, 'admin')
    .catch(() => {})
const promiseSubject = subjectRepository
    .insertSubjects(subjectData)
    .catch(() => {})

Promise.all([promiseUser, promiseSubject]).finally(() => process.exit(1))
