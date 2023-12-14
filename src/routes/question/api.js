const express = require('express')
const router = express.Router()
const { routerResolver } = require('../../shared')
const { celebrate: schemaValidator } = require('celebrate')
const { QuestionPostSchema } = require('./models')
const servcie = require('./service')

router.post(
    '',
    schemaValidator({ body: QuestionPostSchema }),
    routerResolver.safe(async (req, res) => {
        const question = req.body
        const result = await servcie.createQuestion(question)
        return res.status(201).json(result)
    })
)

module.exports = router
