const respository = require('./repository')

const uploadUserProfile = async (file, userId) => {
    const { path: filePath, mimetype } = file
    const path = `users/profiles/${userId}.webp`
    return await respository.uploadFile(filePath, path, mimetype)
}

const uploadQuestionProfile = async (file, question) => {
    const { path: filePath, mimetype } = file
    const { id, indexNumber } = question
    const path = `questions/images/${id}/${indexNumber}.webp`
    return await respository.uploadFile(filePath, path, mimetype)
}

const createBucket = async () => {
    const repositoryExists = await respository.checkBucketExists()

    if (repositoryExists) return

    await respository.createBucket()
}

module.exports = {
    uploadUserProfile,
    uploadQuestionProfile,
    createBucket
}
