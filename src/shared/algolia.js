const algoliasearch = require('algoliasearch')
const env = require('./environment')

const ALGOLIA_APPLICATION_ID = env.getString('ALGOLIA_APPLICATION_ID')
const ALGOLIA_API_KEY = env.getString('ALGOLIA_API_KEY')

const client = algoliasearch(ALGOLIA_APPLICATION_ID, ALGOLIA_API_KEY)
const indexes = [
    {
        name: 'questions',
        searchableAttributes: ['tags', 'statement', 'mysqlId']
    },
    {
        name: 'subjects',
        searchableAttributes: ['name', 'contents', 'id']
    }
]

module.exports = { client, indexes }
