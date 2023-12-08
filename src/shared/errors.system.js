const {
    InternalError,
    UnauthorizedError,
    ExpectationFailedEntityError
} = require('./errors.http')

const errorMessages = {
    600: 'unexpected database error',
    601: 'credentilas invalid or not existed',
    602: 'unable to create auth users'
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

class InsertUserAuthError extends ExpectationFailedEntityError {
    constructor(message = errorMessages[602]) {
        super(message)
        this.systemCode = 602
        this.systemCodeContext = `${context}:602`
    }
}

module.exports = {
    AuthError,
    DbError,
    InsertUserAuthError
}
