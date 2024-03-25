const express = require('express')
const router = express.Router()
const { routerResolver, errors } = require('../../shared')
const service = require('./service')
const multer = require('multer')

const { auth, role } = require('../auth/middlewares')
const { FileMimetypeError, FileSizeError } = errors.system

const upload = multer({
    dest: 'uploads/',
    fileFilter: (req, file, next) => {
        const fileSize = parseInt(req.headers['content-length'])

        if (file.mimetype.indexOf('webp') === -1) {
            return next(new FileMimetypeError())
        } else if (fileSize > 150000) {
            return next(new FileSizeError())
        }

        return next(null, true)
    }
}).single('file')

router.put(
    '/upload/user/profile',
    auth,
    upload,
    routerResolver.safe(async (req, res) => {
        const { context, file } = req
        const { auth } = context
        const url = await service.uploadUserProfile(file, auth.userId)
        return res.status(200).json({ url })
    })
)

router.put(
    '/upload/question/image',
    auth,
    role(['admin']),
    upload,
    routerResolver.safe(async (req, res) => {
        const { query, file } = req
        const { questionId: id, indexNumber } = query
        const url = await service.uploadQuestionProfile(file, {
            id,
            indexNumber
        })
        return res.status(200).json({ url })
    })
)

router.post(
    '/bucket',
    auth,
    role(['admin']),
    routerResolver.safe(async (req, res) => {
        await service.createBucket()
        return res.sendStatus(204)
    })
)

module.exports = router
