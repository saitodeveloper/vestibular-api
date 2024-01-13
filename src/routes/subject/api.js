const express = require('express')
const router = express.Router()
const { routerResolver } = require('../../shared')
const service = require('./service')
const { SubjectListBodyPost } = require('./models')
const { celebrate: schemaValidator } = require('celebrate')

const { auth, role } = require('../auth/middlewares')

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

module.exports = router
