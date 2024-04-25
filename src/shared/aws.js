const AWS = require('aws-sdk')
const env = require('./environment')

const defaultBucketName = env.getString('SUPABASE_BUCKET_NAME')
const defaultRegion = env.getString('SUPABASE_REGION')

const s3 = new AWS.S3({
    s3ForcePathStyle: true,
    accessKeyId: 'test',
    secretAccessKey: 'test',
    endpoint: new AWS.Endpoint('http://localhost:4566')
})

const uploadFile = async (filePath, uploadPath, mimetype) => {
    const fileBuffer = require('fs').readFileSync(filePath)
    const params = {
        Bucket: defaultBucketName,
        Key: uploadPath,
        Body: fileBuffer,
        ContentType: mimetype
    }
    const result = await s3.upload(params).promise()

    return result.Location
}

const createBucket = () => {
    const params = {
        Bucket: defaultBucketName,
        CreateBucketConfiguration: {
            LocationConstraint: defaultRegion
        }
    }

    return s3.createBucket(params).promise()
}

const checkBucketExists = () => {
    const params = {
        Bucket: defaultBucketName
    }

    return new Promise((resolve, reject) => {
        s3.headBucket(params, function (err, data) {
            if (err) {
                if (err.code === 'NotFound' || err.code === 'Forbidden') {
                    resolve(false)
                } else {
                    reject(err)
                }
            } else {
                resolve(true)
            }
        })
    })
}

module.exports = { s3, uploadFile, createBucket, checkBucketExists }
