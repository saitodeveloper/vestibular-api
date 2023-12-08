const crypto = require('crypto')
const { v4: uuidv4 } = require('uuid')

const createSalt = () => {
    const part1 = Math.random().toString(36).substring(2)
    const part2 = Math.random().toString(36).substring(2)

    return `${part1}${part2}`
}

const randomLetter = () => {
    const isCapsize = Math.trunc(Math.random() * 2)
    const letter = Math.trunc(Math.random() * 26)
    const lowerFirst = 'a'.charCodeAt(0)
    const capizeFirst = 'A'.charCodeAt(0)
    return String.fromCharCode((isCapsize ? capizeFirst : lowerFirst) + letter)
}

const randomNumber = () => Math.trunc(Math.random() * 10).toString()

const randomWord = size =>
    Array.from(Array(size).keys())
        .map(_ => {
            const isLetter = Math.trunc(Math.random() * 2)
            return isLetter ? randomLetter() : randomNumber()
        })
        .join('')

const decryptAES = (message, dechiperKey) => {
    const [key, iv] = dechiperKey.split('.')
    const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv)
    decipher.setAutoPadding(true)
    let decryptedMessage = decipher.update(message, 'base64', 'utf8')
    return (decryptedMessage += decipher.final('utf8'))
}

const encryptAES = (message, key, iv) => {
    const cipher = crypto.createCipheriv('aes-256-cbc', key, iv)
    cipher.setAutoPadding(true)
    return cipher.update(message, 'utf8', 'base64') + cipher.final('base64')
}

const generateOtp = () => {
    const key = uuidv4()
    const otp = randomWord(32)
    const iv = randomWord(16)
    return [key, otp, iv]
}

const hashEncode = async phrase => {
    const sha512 = crypto.createHash('sha512')
    return await sha512.update(phrase, 'utf-8').digest('hex')
}

/**
 * this function will create a string sha512 hash with salt
 * @param {string} phrase is string to be encode
 * @returns {string} a sha512 and salt string separated by `.` character
 */
const hashSaltEncode = async phrase => {
    const salt = createSalt()
    const hash = await hashEncode(`${phrase}.${salt}`)
    return `${hash}.${salt}`
}

const isHashEqual = async (phrase, hash) => {
    const [userHash, salt] = hash.split('.')
    const testHash = await hashEncode(`${phrase}.${salt}`)

    return userHash === testHash
}

module.exports = {
    createSalt,
    decryptAES,
    encryptAES,
    generateOtp,
    hashEncode,
    hashSaltEncode,
    isHashEqual
}
