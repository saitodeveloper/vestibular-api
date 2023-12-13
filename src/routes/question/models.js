const joi = require('joi')
const { models } = require('../../shared')

const { QuestionSchema, AlternativeSchema } = models

const QuestionPostSchema = joi.object({
    statement: QuestionSchema.statement.required(),
    institution: QuestionSchema.institution.required(),
    year: QuestionSchema.year.required(),
    examName: QuestionSchema.examName.required(),
    enum: QuestionSchema.enum.required(),
    alternatives: joi
        .array()
        .items(
            joi.object({
                correct: AlternativeSchema.correct.required(),
                statement: AlternativeSchema.statement.required()
            })
        )
        .required()
})

module.exports = { QuestionPostSchema }
