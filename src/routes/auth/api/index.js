const express = require('express')
const router = express.Router()
const { decryptDevice, auth } = require('../middlewares')
const { routerResolver, middlewares } = require('../../../shared')
const { celebrate: schemaValidator } = require('celebrate')
const {
    AuthUserPostBody,
    LoginPostBody,
    DevicePostHeader
} = require('./models')
const service = require('./service')

router.post(
    '/login',
    middlewares.validate({ body: LoginPostBody, headers: DevicePostHeader }),
    decryptDevice,
    routerResolver.safe(async (req, res) => {
        const auth = req.body
        const { serial, type } = req.context.device
        const tokenObj = await service.login(auth, { type, serial })
        return res.status(200).json(tokenObj)
    })
)

router.get(
    '/refresh',
    decryptDevice,
    auth,
    routerResolver.safe(async (req, res) => {
        const { auth, device, tokens } = req.context
        const tokenObj = await service.refreshLogin(auth, device, tokens)
        return res.status(200).json(tokenObj)
    })
)

router.post(
    '/user',
    schemaValidator({ body: AuthUserPostBody, headers: DevicePostHeader }),
    decryptDevice,
    routerResolver.safe(async (req, res) => {
        const { device } = req.context
        const { user, auth } = req.body
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
