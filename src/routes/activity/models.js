const joi = require('joi')
const { models } = require('../../shared')

const { ActivitySchema } = models

const ActivityPost = joi.object({
    idQuestion: ActivitySchema.idQuestion.required(),
    idAlternative: ActivitySchema.idAlternative.required()
})

module.exports = { ActivityPost }