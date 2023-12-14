/**
 * Router handler callback
 * @callback handlerCallback
 * @param {any} req express req
 * @param {any} res express res
 * @param {function} next callback function to the next middleware
 * @returns {Promise} async call for handler
 */

/**
 * Create safe handler for Express routes
 * @param {handlerCallback} handler
 * @returns {Promise} async call for handler
 */
const safe = handler => {
    return async (req, res, next) => {
        try {
            await handler(req, res)
        } catch (error) {
            next(error)
        }
    }
}

module.exports = { safe }
