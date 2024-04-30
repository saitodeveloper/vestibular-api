const {
    S3Client,
    CreateBucketCommand,
    HeadBucketCommand
} = require('@aws-sdk/client-s3')
const { Upload } = require('@aws-sdk/lib-storage')
const { NodeHttpHandler } = require('@aws-sdk/node-http-handler')
const fs = require('fs')
const env = require('./environment')

const defaultBucketName = env.getString('SUPABASE_BUCKET_NAME')
const defaultRegion = env.getString('SUPABASE_REGION')

const s3Client = new S3Client({
    region: defaultRegion,
    endpoint: 'http://localhost:4566',
    forcePathStyle: true,
    requestHandler: new NodeHttpHandler({ httpOptions: { connectTimeout: 0 } })
})

const uploadFile = async (filePath, uploadPath, mimetype) => {
    const fileBuffer = fs.readFileSync(filePath)
    const upload = new Upload({
        client: s3Client,
        params: {
            Bucket: defaultBucketName,
            Key: uploadPath,
            Body: fileBuffer,
            ContentType: mimetype
        }
    })

    const result = await upload.done()
    return result.Location
}

const createBucket = async () => {
    const command = new CreateBucketCommand({
        Bucket: defaultBucketName,
        CreateBucketConfiguration: {
            LocationConstraint: defaultRegion
        }
    })
    await s3Client.send(command)
}

const checkBucketExists = async () => {
    try {
        const command = new HeadBucketCommand({
            Bucket: defaultBucketName
        })
        await s3Client.send(command)
        return true
    } catch (err) {
        if (err.name === 'NotFound' || err.name === 'Forbidden') {
            return false
        }
        throw err
    }
}

module.exports = { s3Client, uploadFile, createBucket, checkBucketExists }
