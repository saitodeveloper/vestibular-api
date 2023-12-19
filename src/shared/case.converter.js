const { mapKeys, camelCase } = require('lodash')

const converter = (obj, func = camelCase) => mapKeys(obj, (_, key) => func(key))

module.exports = { converter }
