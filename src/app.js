const express = require('express')
const { errors } = require('celebrate')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const { v4: uuidv4 } = require('uuid')
const dotenv = require('dotenv')

dotenv.config()

const { NotFoundError } = require('./shared/errors.http')
const { logger } = require('./shared')

const auth = require('./routes/auth/api')
const question = require('./routes/question/api')
const activity = require('./routes/activity/api')
const subject = require('./routes/subject/api')
const media = require('./routes/media/api')

const app = express()
const corsOptions = {
    credentials: true,
    optionsSuccessStatus: 200,
    origin: (_, callback) => {
        callback(null, { origin: true })
    }
}

/** Collect request start timestamp */
app.use((req, _, next) => {
    if (!req.context) req.context = {}
    req.context.start = performance.now()
    req.context.uuid = uuidv4()
    next()
})

app.use(cors(corsOptions))
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

/** Routes */
app.use('/v1/auth', auth)
app.use('/v1/question', question)
app.use('/v1/activity', activity)
app.use('/v1/subject', subject)
app.use('/v1/media', media)

/** Not found Handler */
app.use((_req, _res, next) => {
    next(new NotFoundError())
})

app.use(errors())

app.use((error, req, res, _next) => {
    const { message, systemCode, systemCodeContext, status } = error
    const errorDto = {
        message,
        systemCode,
        systemCodeContext,
        requestUUID: req.context.uuid
    }

    logger.local.requestError(req, error)

    return res.status(status || 500).json(errorDto)
})

module.exports = app
