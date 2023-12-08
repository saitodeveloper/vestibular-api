const joi = require('joi')
const { models } = require('../../../shared')

const { UserSchema, IdentitySchema, DeviceSchema } = models

const PostUserSchema = joi.object({
    firstName: UserSchema.firstName.required(),
    lastName: UserSchema.lastName.required()
})

const PostAuthSchema = joi.object({
    email: IdentitySchema.identity.email().required(),
    password: joi.string().min(6).max(20).required()
})

const PostAuthDeviceSchema = joi.object({
    type: DeviceSchema.type.required(),
    serial: DeviceSchema.serial.required()
})

const PostAuthUserSchema = joi.object({
    auth: PostAuthSchema,
    device: PostAuthDeviceSchema,
    user: PostUserSchema
})

const PostLoginHeader = joi
    .object({
        device: joi.string().min(1).max(255),
        otpKey: joi.string().length(16)
    })
    .unknown(true)

module.exports = {
    PostAuthSchema,
    PostAuthUserSchema,
    PostLoginHeader,
    PostUserSchema
}
