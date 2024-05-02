const {
    BadRequestError,
    InternalError,
    UnauthorizedError,
    UnprocessableEntityError,
    ServiceUnavailable
} = require('./errors.http')

const errorMessages = {
    600: 'unexpected database error',
    601: 'credentilas invalid or not existed',
    602: 'unable to create auth users',
    603: 'unable to cerate question',
    604: 'unable to create activity',
    605: 'unprocessable token',
    606: 'unable to check device',
    607: 'unable to insert subjects',
    608: 'unable to upload the file',
    609: 'unable reach third party service error',
    610: 'invalid file mimetype',
    611: 'invalid file size',
    612: 'duplicated user key'
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

class InsertUserAuthError extends InternalError {
    constructor(causedBy, message = errorMessages[602]) {
        super(message)
        this.systemCode = 602
        this.systemCodeContext = `${context}:602`
        this.causedBy = causedBy
    }
}

class InsertQuestionError extends InternalError {
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

class InsertSubjectsError extends InternalError {
    constructor(message = errorMessages[607]) {
        super(message)
        this.systemCode = 607
        this.systemCodeContext = `${context}:607`
    }
}

class UploadFileError extends ServiceUnavailable {
    constructor(message = errorMessages[608]) {
        super(message)
        this.systemCode = 608
        this.systemCodeContext = `${context}:608`
    }
}

class ThirdPartyError extends ServiceUnavailable {
    constructor(message = errorMessages[609]) {
        super(message)
        this.systemCode = 609
        this.systemCodeContext = `${context}:609`
    }
}

class FileMimetypeError extends BadRequestError {
    constructor(message = errorMessages[610]) {
        super(message)
        this.systemCode = 610
        this.systemCodeContext = `${context}:610`
    }
}

class FileSizeError extends BadRequestError {
    constructor(message = errorMessages[611]) {
        super(message)
        this.systemCode = 611
        this.systemCodeContext = `${context}:611`
    }
}

class DuplicateUserError extends InsertUserAuthError {
    constructor(causedBy, message = errorMessages[612]) {
        super(causedBy, message)
        this.systemCode = 612
        this.systemCodeContext = `${context}:612`
        this.causedBy = causedBy
    }
}

module.exports = {
    AuthError,
    DbError,
    InsertUserAuthError,
    InsertQuestionError,
    InsertActivityError,
    UnparsableToken,
    InvalidDevice,
    InsertSubjectsError,
    UploadFileError,
    ThirdPartyError,
    FileMimetypeError,
    FileSizeError,
    DuplicateUserError
}
