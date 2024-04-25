const { createClient } = require('@supabase/supabase-js')
const env = require('./environment')

const url = env.getString('SUPABASE_URL')
const apiKey = env.getString('SUPABASE_API_KEY')
const defaultBucketName = env.getString('SUPABASE_BUCKET_NAME')

const client = createClient(url, apiKey)

const uploadFile = async (filePath, uploadPath, mimetype) => {
    const fileBuffer = require('fs').readFileSync(filePath)
    const { data, error } = await client.storage
        .from(defaultBucketName)
        .upload(uploadPath, fileBuffer, {
            contentType: mimetype,
            upsert: true
        })

    if (error) throw error

    const { data: publicUrlData } = await client.storage
        .from(defaultBucketName)
        .getPublicUrl(data.path)

    return publicUrlData.publicUrl
}

const createBucket = async () => {
    const { error } = await client.storage.createBucket(defaultBucketName, {
        public: true
    })

    if (error) throw error
}

const checkBucketExists = async () => {
    const { error } = await client.storage.getBucket(defaultBucketName)
    const bucketNotFound = error?.status === 400

    if (bucketNotFound) return false

    if (error) throw error

    return true
}

module.exports = { client, uploadFile, createBucket, checkBucketExists }
