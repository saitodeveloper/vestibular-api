/**
 * Find a value on the process environment object
 * @param {string} key key value to find on enviroment variables
 * @param {string} def default value to return in case of key value is undefined
 * @returns {string} value on the environment system
 */
const getString = (key, def) => process.env[key] ?? def

/**
 * Find a number value on the process environment object
 * @param {string} key key value to find on enviroment variables
 * @param {number} def default value to return in case of key value is undefined
 * @returns {number} value on the environment system
 */
const getInteger = (key, def) => {
    const test = process.env[key]

    if (!test || isNaN(Number(test))) {
        return def
    }

    return parseInt(test)
}

/**
 * Find a bool value on the process environment object
 * @param {string} key key value to find on enviroment variables
 * @param {boolean} def default value to return in case of key value is undefined
 * @returns {boolean} value on the environment system
 */
const getBoolean = (key, def) => {
    const test = process.env[key]

    if (test !== 'false' && test !== 'true') {
        return def
    }

    return test === 'true'
}

module.exports = {
    getBoolean,
    getInteger,
    getString
}
