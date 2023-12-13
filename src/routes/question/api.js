const express = require('express')
const router = express.Router()
const { routerResolver } = require('../../shared')
const { celebrate: schemaValidator } = require('celebrate')
const { QuestionPostSchema } = require('./models')

router.post(
    '',
    schemaValidator({ body: QuestionPostSchema }),
    routerResolver.safe(async (req, res) => {
        const question = req.body
        return res.status(201).json({})
    })
)

module.exports = router
