const env = require('../../shared/environment')
const { service } = require('../../shared')

const ENV = env.getString('NODE_ENV', 'local')
const { aws, supabase } = service.storage

const uploadFile = async (filePath, uploadPath, mimetype) => {
    const result =
        ENV === 'local'
            ? await aws.uploadFile(filePath, uploadPath, mimetype)
            : await supabase.uploadFile(filePath, uploadPath, mimetype)

    return result
}

module.exports = {
    uploadFile,
    createBucket: ENV === 'local' ? aws.createBucket : supabase.createBucket,
    checkBucketExists:
        ENV === 'local' ? aws.checkBucketExists : supabase.checkBucketExists
}
