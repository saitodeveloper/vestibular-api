const express = require('express')
const router = express.Router()
const { routerResolver } = require('../../shared')
const { celebrate: schemaValidator } = require('celebrate')
const {
    QuestionPostBody,
    QuestionGetQuery,
    QuestionGetParams
} = require('./models')
const service = require('./service')

router.post(
    '',
    schemaValidator({ body: QuestionPostBody }),
    routerResolver.safe(async (req, res) => {
        const question = req.body
        const result = await service.createQuestion(question)
        return res.status(201).json(result)
    })
)

router.get(
    '',
    schemaValidator({ query: QuestionGetQuery }),
    routerResolver.safe(async (req, res) => {
        const searchParam = req.query
        const result = await service.searchQuestion(searchParam)
        return res.status(200).json(result)
    })
)

router.get(
    '/:id',
    schemaValidator({ params: QuestionGetParams }),
    routerResolver.safe(async (req, res) => {
        const { id } = req.params
        const result = await service.searchQuestionById(null, id)
        return res.status(result ? 201 : 404).json(result)
    })
)

module.exports = router
