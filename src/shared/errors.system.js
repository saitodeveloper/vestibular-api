const {
    InternalError,
    UnauthorizedError,
    UnprocessableEntityError
} = require('./errors.http')

const errorMessages = {
    600: 'unexpected database error',
    601: 'credentilas invalid or not existed',
    602: 'unable to create auth users',
    603: 'unable to cerate question',
    604: 'unable to create activity',
    605: 'unprocessable token',
    606: 'unable to check device'
}
const context = 'system'

class DbError extends InternalError {
    constructor(message = errorMessages[600]) {
        super(message)
        this.systemCode = 600
        this.systemCodeContext = `${context}:600`
    }
}

class AuthError extends UnauthorizedError {
    constructor(message = errorMessages[601]) {
        super(message)
        this.systemCode = 601
        this.systemCodeContext = `${context}:601`
    }
}

class InsertUserAuthError extends UnprocessableEntityError {
    constructor(message = errorMessages[602]) {
        super(message)
        this.systemCode = 602
        this.systemCodeContext = `${context}:602`
    }
}

class InsertQuestionError extends UnprocessableEntityError {
    constructor(message = errorMessages[603]) {
        super(message)
        this.systemCode = 603
        this.systemCodeContext = `${context}:603`
    }
}

class InsertActivityError extends UnprocessableEntityError {
    constructor(message = errorMessages[604]) {
        super(message)
        this.systemCode = 604
        this.systemCodeContext = `${context}:604`
    }
}

class UnparsableToken extends UnprocessableEntityError {
    constructor(message = errorMessages[605]) {
        super(message)
        this.systemCode = 605
        this.systemCodeContext = `${context}:605`
    }
}

class InvalidDevice extends UnprocessableEntityError {
    constructor(message = errorMessages[606]) {
        super(message)
        this.systemCode = 606
        this.systemCodeContext = `${context}:606`
    }
}

module.exports = {
    AuthError,
    DbError,
    InsertUserAuthError,
    InsertQuestionError,
    InsertActivityError,
    UnparsableToken,
    InvalidDevice
}
