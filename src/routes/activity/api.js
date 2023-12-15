const express = require('express')
const router = express.Router()
const { routerResolver } = require('../../shared')
const { ActivityPostBody } = require('./models')
const { celebrate: schemaValidator } = require('celebrate')
const service = require('./service')

router.post(
    '',
    schemaValidator({ body: ActivityPostBody }),
    routerResolver.safe(async (req, res) => {
        const activity = req.body
        const result = await service.createActivity(activity)
        return res.status(201).json(result)
    })
)

module.exports = router
