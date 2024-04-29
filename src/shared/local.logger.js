const obfuscator = require('./object.obfuscator')

const ansiColors = {
    red: '\x1b[31m',
    yellow: '\x1b[33m',
    green: '\x1b[32m',
    ending: '\x1b[0m'
}

const requestInfo = req => {
    const { method, path, context } = req
    const deltaTime = performance.now() - context.start
    const { green, ending } = ansiColors
    const requestDetails = `[${context.uuid}] ${method} ${path} ${deltaTime} ms`

    console.log(green, requestDetails, ending)
}

const requestError = (req, error) => {
    const { method, path, context, body } = req
    const { stack } = error
    const { red, ending } = ansiColors
    const deltaTime = performance.now() - context.start
    const requestDetails = `[${context.uuid}] ${method} ${path} ${deltaTime} ms`
    const obfuscateBody = obfuscator.obfuscatePII(body)
    const errorMessage = `${stack}
    Response Body: ${JSON.stringify(error)}
    Request Body: ${JSON.stringify(obfuscateBody)}`

    console.error(red, errorMessage, ending)
    console.error(red, requestDetails, ending)
}

module.exports = { requestInfo, requestError }
