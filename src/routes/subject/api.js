const express = require('express')
const router = express.Router()
const { routerResolver, middlewares } = require('../../shared')
const service = require('./service')
const { SubjectListBodyPost, SubjectQueryGet } = require('./models')
const { celebrate: schemaValidator } = require('celebrate')

const { auth, role } = require('../auth/middlewares')
const { validate } = middlewares

router.post(
    '/list',
    auth,
    role(['admin']),
    schemaValidator({ body: SubjectListBodyPost }),
    routerResolver.safe(async (req, res) => {
        const result = await service.createSubjects(req.body)
        return res.status(201).json(result)
    })
)

router.get(
    '/',
    validate({ query: SubjectQueryGet }),
    routerResolver.safe(async (req, res) => {
        const result = await service.searchSubjects(req.query)
        return res.status(201).json(result)
    })
)

module.exports = router
