const express = require('express')
const router = express.Router()
const { decryptDevice } = require('../middlewares')
const { routerResolver } = require('../../../shared')
const { celebrate: schemaValidator } = require('celebrate')
const {
    PostAuthUserSchema,
    PostAuthSchema,
    PostLoginHeader
} = require('./models')
const service = require('./service')

router.post(
    '/login',
    schemaValidator({ body: PostAuthSchema, headers: PostLoginHeader }),
    decryptDevice,
    async (req, res, next) => {
        try {
            const auth = req.body
            const { serial, name } = req.device
            const respositoryUser = await service.login(auth, {
                name,
                serial
            })
            return res.status(200).json(respositoryUser)
        } catch (error) {
            next(error)
        }
    }
)

router.post(
    '/user',
    schemaValidator({ body: PostAuthUserSchema }),
    routerResolver.safe(async (req, res) => {
        const user = req.body.user
        const auth = req.body.auth
        const device = req.body.device
        const respositoryUser = await service.createUser(user, auth, device)
        return res.status(201).json(respositoryUser)
    })
)

router.get(
    '/otp',
    routerResolver.safe(async (_req, res) => {
        const response = await service.otp()
        res.status(200).json(response)
    })
)
module.exports = router
