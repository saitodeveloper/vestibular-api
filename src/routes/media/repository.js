const { supabase, errors } = require('../../shared')

const { UploadFileError, ThirdPartyError } = errors.system

const uploadFile = async (filePath, uploadPath, mimetype) => {
    const { client, defaultBucketName } = supabase
    const fileBuffer = require('fs').readFileSync(filePath)
    const { error } = await client.storage
        .from(defaultBucketName)
        .upload(uploadPath, fileBuffer, {
            contentType: mimetype
        })

    if (error) throw new UploadFileError()
}

const createBucket = async () => {
    const { client, defaultBucketName } = supabase
    const { error } = await client.storage.createBucket(defaultBucketName, {
        public: true
    })

    if (error) throw new ThirdPartyError()
}

const checkBucketExists = async () => {
    const { client, defaultBucketName } = supabase
    const { error } = await client.storage.getBucket(defaultBucketName)

    /** Not found */
    if (error?.status === 400) return false

    if (error) throw new ThirdPartyError()

    return true
}

module.exports = { uploadFile, createBucket, checkBucketExists }
