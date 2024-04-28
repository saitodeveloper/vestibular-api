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

    console.log(
        green,
        `[${context.uuid}] ${method} ${path} ${deltaTime} ms`,
        ending
    )
}

const requestError = (req, error) => {
    const { method, path, context, body } = req
    const { stack } = error
    const { red, ending } = ansiColors
    const deltaTime = performance.now() - context.start

    console.error(red, stack, ending)
    console.error(red, JSON.stringify(error), ending)
    console.error(red, `${JSON.stringify(body)}`, ending)
    console.error(
        red,
        `[${context.uuid}] ${method} ${path} ${deltaTime} ms`,
        ending
    )
}

module.exports = { requestInfo, requestError }
