const express = require('express')
const router = express.Router()
const { decryptDevice } = require('../middlewares')
const { routerResolver, middlewares } = require('../../../shared')
const { celebrate: schemaValidator } = require('celebrate')
const { AuthUserPostBody, LoginPostBody, LoginPostHeader } = require('./models')
const service = require('./service')

router.post(
    '/login',
    middlewares.validate({ body: LoginPostBody, headers: LoginPostHeader }),
    decryptDevice,
    routerResolver.safe(async (req, res) => {
        const auth = req.body
        const { serial, type } = req.context.device
        const respositoryUser = await service.login(auth, { type, serial })
        return res.status(200).json(respositoryUser)
    })
)

router.post(
    '/user',
    schemaValidator({ body: AuthUserPostBody }),
    routerResolver.safe(async (req, res) => {
        const { user, auth, device } = req.body
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
