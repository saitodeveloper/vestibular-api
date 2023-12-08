const algoliasearch = require('algoliasearch')
const {
    db: { algolia }
} = require('../src/shared')
const dotenv = require('dotenv')

dotenv.config()
const ALGOLIA_APPLICATION_ID = process.env.ALGOLIA_APPLICATION_ID
const ALGOLIA_API_KEY = process.env.ALGOLIA_API_KEY

const client = algoliasearch(ALGOLIA_APPLICATION_ID, ALGOLIA_API_KEY)

const initDb = async () => {
    const promises = []

    for (let index of algolia.indexes) {
        const initIndex = client.initIndex(index.name)
        promises.push(
            initIndex.setSettings({
                searchableAttributes: index.searchableAttributes
            })
        )
    }

    await Promise.all(promises)
}

initDb()
    .then(() => process.exit(1))
    .catch(error => console.error(error))
