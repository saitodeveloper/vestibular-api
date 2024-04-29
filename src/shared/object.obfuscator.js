const piiKeyList = ['password', 'serial']
const partialObfuscate = []

const obfuscatePII = obj => {
    const copiedObj = structuredClone(obj)
    obfuscatePIIRecursive(copiedObj)
    return copiedObj
}

const obfuscateStart = (str, showRemaining = 3, character = '*') => {
    try {
        const positiveShowRemaining =
            str.length - showRemaining >= 0 ? str.length - showRemaining : 0
        let maskEndIndex
        if (positiveShowRemaining < showRemaining)
            maskEndIndex = str.length - positiveShowRemaining
        else maskEndIndex = str.length - showRemaining

        const mask = str
            .substring(0, maskEndIndex)
            .split('')
            .map(() => character)
            .join('')
        const remaining = str.substring(maskEndIndex, str.length)
        return mask + remaining
    } catch {
        return 'obfuscateError'
    }
}

const obfuscateEmail = email => {
    try {
        const parts = email.toLowerCase().split('@')

        if (parts.length < 2 || parts.includes('')) throw new Error()

        const emailUsername = parts[0]
        const emailServerDomain = parts[1]
        return obfuscateStart(emailUsername) + '@' + emailServerDomain
    } catch {
        return 'obfuscateError'
    }
}

const obfuscatePIIRecursive = obj => {
    if (!obj || typeof obj !== 'object') throw new Error('Enable to obfuscate')

    for (const key of Object.keys(obj)) {
        const isPIIKey = piiKeyList.some(piiKey => key === piiKey)
        const isPartialObfuscate = partialObfuscate.some(
            piiKey => key === piiKey
        )
        const isEmailObfuscate = 'email' === key

        if (isPIIKey) obj[key] = '******'
        else if (isPartialObfuscate) obj[key] = obfuscateStart(obj[key])
        else if (isEmailObfuscate) obj[key] = obfuscateEmail(obj[key])
        else if (typeof obj[key] === 'object') obfuscatePIIRecursive(obj[key])
    }
}

module.exports = { obfuscatePII }
