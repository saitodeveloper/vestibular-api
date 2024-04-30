const { BadRequestError } = require('./errors.http')

/**
 * @typedef {import('joi').Schema} JoiSchema
 */

/**
 * @callback ExpressMiddleware
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */

/**
 * @typedef {object} SchemaDictionary
 * @property {JoiSchema} query
 * @property {JoiSchema} param
 * @property {JoiSchema} body
 * @property {JoiSchema} header
 */

/**
 * Validate request field body, query or param as a middleware
 * @param {SchemaDictionary} schemaDict
 * @returns {ExpressMiddleware} express middleware for schema validation
 */
const validate = schemaDict => (req, _res, next) => {
    for (let [objectKey, schema] of Object.entries(schemaDict)) {
        const target = req[objectKey]
        const result = schema.validate(target, { abortEarly: false })
        const { error: bodyError, value } = result

        if (bodyError && bodyError.details) {
            const message = `${objectKey}: ${bodyError.details
                .map(({ message }) => message)
                .join(', ')}`
            return next(new BadRequestError(message))
        }

        req[objectKey] = value
    }

    return next()
}
module.exports = { validate }
