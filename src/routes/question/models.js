const joi = require('joi')
const { models } = require('../../shared')

const { QuestionSchema, AlternativeSchema, PaginateObject } = models

const QuestionPostBody = joi.object({
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

const QuestionGetQuery = joi.object({
    ...PaginateObject
})

const QuestionGetParams = joi.object({
    id: QuestionSchema.id
})

module.exports = { QuestionPostBody, QuestionGetQuery, QuestionGetParams }
