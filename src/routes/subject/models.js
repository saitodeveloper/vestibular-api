const joi = require('joi')
const { models } = require('../../shared')

const { SubjectSchema, PaginateObject } = models

const SubjectListBodyPost = joi.array().items(
    joi.object({
        name: SubjectSchema.name.required(),
        parent: SubjectSchema.parent
    })
)

const SubjectQueryGet = joi.object({
    name: SubjectSchema.name.required(),
    ...PaginateObject
})

module.exports = { SubjectListBodyPost, SubjectQueryGet }
