const joi = require('joi')
const { models } = require('../../../shared')

const { UserSchema, IdentitySchema, DeviceSchema } = models

const UserPostBody = joi.object({
    firstName: UserSchema.firstName.required(),
    lastName: UserSchema.lastName.required()
})

const LoginPostBody = joi.object({
    email: IdentitySchema.identity.email().required(),
    password: joi.string().min(6).max(20).required()
})

const AuthUserPostBody = joi.object({
    auth: LoginPostBody,
    user: UserPostBody
})

const DevicePostHeader = joi
    .object({
        device: joi.string().min(1).max(255),
        otpKey: joi.string().length(16)
    })
    .unknown(true)

module.exports = {
    LoginPostBody,
    AuthUserPostBody,
    DevicePostHeader
}
