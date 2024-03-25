const errorMessages = {
    400: 'bad request',
    401: 'authentication failed',
    403: 'you are not allowed to proceed',
    404: 'not found',
    409: 'entity already exist',
    417: 'expectation failed',
    422: 'unprocessable entity',
    500: 'internal server error occured',
    502: 'bad gateway',
    503: 'service unavailable'
}

class BadRequestError extends Error {
    constructor(message = errorMessages[400]) {
        super(message)
        this.status = 400
    }
}

class UnauthorizedError extends Error {
    constructor(message = errorMessages[401]) {
        super(message)
        this.status = 401
    }
}

class ForbidenError extends Error {
    constructor(message = errorMessages[403]) {
        super(message)
        this.status = 403
    }
}

class NotFoundError extends Error {
    constructor(message = errorMessages[404]) {
        super(message)
        this.status = 404
    }
}

class ConflictError extends Error {
    constructor(message = errorMessages[409]) {
        super(message)
        this.status = 409
    }
}

class ExpectationFailedError extends Error {
    constructor(message = errorMessages[417]) {
        super(message)
        this.status = 417
    }
}

class UnprocessableEntityError extends Error {
    constructor(message = errorMessages[422]) {
        super(message)
        this.status = 422
    }
}

class InternalError extends Error {
    constructor(message = errorMessages[500]) {
        super(message)
        this.status = 500
    }
}

class BadGateway extends Error {
    constructor(message = errorMessages[502]) {
        super(message)
        this.status = 502
    }
}

class ServiceUnavailable extends Error {
    constructor(message = errorMessages[503]) {
        super(message)
        this.status = 503
    }
}

module.exports = {
    BadGateway,
    BadRequestError,
    ConflictError,
    ExpectationFailedError,
    ForbidenError,
    InternalError,
    NotFoundError,
    UnauthorizedError,
    UnprocessableEntityError,
    ServiceUnavailable
}
