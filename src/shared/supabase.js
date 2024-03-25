const { createClient } = require('@supabase/supabase-js')
const env = require('./environment')

const url = env.getString('SUPABASE_URL')
const apiKey = env.getString('SUPABASE_API_KEY')
const defaultBucketName = env.getString('SUPABASE_BUCKET_NAME')

const client = createClient(url, apiKey)

module.exports = { client, defaultBucketName }
