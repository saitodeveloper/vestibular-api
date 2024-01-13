const JoiDateExtension = require('@joi/date')
const joi = require('joi').extend(JoiDateExtension)

/** Database schemas */
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

const QuestionSchema = {
    statement: joi.string().min(1),
    institution: joi.string().min(1).max(45),
    year: joi
        .number()
        .integer()
        .positive()
        .min(1940)
        .max(Number.MAX_SAFE_INTEGER),
    examName: joi.string().min(1).max(45),
    enum: joi.number().integer().positive().min(1).max(Number.MAX_SAFE_INTEGER),
    ...BaseSchema
}

const AlternativeSchema = {
    statement: joi.string().min(1),
    correct: joi.boolean(),
    questionId: joi
        .number()
        .integer()
        .positive()
        .min(1)
        .max(Number.MAX_SAFE_INTEGER),
    ...BaseSchema
}

const ActivitySchema = {
    correct: joi.boolean(),
    userId: joi
        .number()
        .integer()
        .positive()
        .min(1)
        .max(Number.MAX_SAFE_INTEGER),
    deviceId: joi
        .number()
        .integer()
        .positive()
        .min(1)
        .max(Number.MAX_SAFE_INTEGER),
    deviceSerial: joi.string().min(1).max(90),
    questionId: joi
        .number()
        .integer()
        .positive()
        .min(1)
        .max(Number.MAX_SAFE_INTEGER),
    alternativeId: joi
        .number()
        .integer()
        .positive()
        .min(1)
        .max(Number.MAX_SAFE_INTEGER),
    ...BaseSchema
}

const SubjectSchema = {
    name: joi.string().min(1).max(45),
    parent: joi.string().min(1).max(45),
    ...BaseSchema
}

/** Global objects */
const PaginateObject = {
    page: joi
        .number()
        .integer()
        .positive()
        .min(1)
        .max(Number.MAX_SAFE_INTEGER)
        .default(1),
    limit: joi.number().integer().positive().min(1).max(500).default(10)
}

module.exports = {
    OAuthSchema,
    DeviceSchema,
    IdentitySchema,
    UserSchema,
    QuestionSchema,
    AlternativeSchema,
    ActivitySchema,
    PaginateObject,
    SubjectSchema
}
