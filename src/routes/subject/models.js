const joi = require('joi')
const { models } = require('../../shared')

const { SubjectSchema } = models

const SubjectListBodyPost = joi.array().items(joi.object({
    name: SubjectSchema.name.required(),
    parent: SubjectSchema.parent
}))

module.exports = { SubjectListBodyPost }
