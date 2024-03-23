const express = require('express')
const { errors } = require('celebrate')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const { NotFoundError } = require('./shared/errors.http')

const dotenv = require('dotenv')

dotenv.config()

const auth = require('./routes/auth/api')
const question = require('./routes/question/api')
const activity = require('./routes/activity/api')
const subject = require('./routes/subject/api')

const app = express()
const corsOptions = {
    credentials: true,
    optionsSuccessStatus: 200,
    origin: (_, callback) => {
        callback(null, { origin: true })
    }
}

app.use(cors(corsOptions))
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

/** Routes */
app.use('/v1/auth', auth)
app.use('/v1/question', question)
app.use('/v1/activity', activity)
app.use('/v1/subject', subject)

/** Not found Handler */
app.use((_req, _res, next) => {
    next(new NotFoundError())
})

app.use(errors())

app.use(
    ({ message, systemCode, systemCodeContext, status }, _req, res, _next) => {
        const errorDto = { message, systemCode, systemCodeContext }
        return res.status(status || 500).json(errorDto)
    }
)

module.exports = app
