const joi = require('joi')
const { models } = require('../../shared')

const { ActivitySchema } = models

const ActivityPostBody = joi.object({
    questionId: ActivitySchema.questionId.required(),
    alternativeId: ActivitySchema.alternativeId.required()
})

module.exports = { ActivityPostBody }
