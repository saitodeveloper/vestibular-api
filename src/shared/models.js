const JoiDateExtension = require('@joi/date')
const joi = require('joi').extend(JoiDateExtension)

const BaseSchema = {
    createdAt: joi.date(),
    id: joi.number(),
    updatedAt: joi.date()
}

const OAuthSchema = {
    hash: joi.string(),
    userId: joi.number(),
    ...BaseSchema
}

const DeviceSchema = {
    type: joi.string().min(1).max(50),
    serial: joi.string(),
    ...BaseSchema
}

const IdentitySchema = {
    identity: joi.string().min(1).max(50),
    value: joi.string().valid('email'),
    ...BaseSchema
}

const UserSchema = {
    firstName: joi.string().min(1).max(50),
    lastName: joi.string().min(1).max(50),
    role: joi.string().min(1).max(50),
    ...BaseSchema
}

module.exports = {
    OAuthSchema,
    DeviceSchema,
    IdentitySchema,
    UserSchema
}
