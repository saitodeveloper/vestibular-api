const env = require('./environment')

module.exports = {
    models: require('./models'),
    routerResolver: require('./routeResolver'),
    errors: {
        http: require('./errors.http'),
        system: require('./errors.system')
    },
    db: {
        redis: require('./redis'),
        mysql: require('./mysql'),
        algolia: require('./algolia')
    },
    env: require('./environment'),
    token: require('./token'),
    caseConverter: require('./case.converter'),
    middlewares: require('./middlewares'),
    logger: {
        local: require('./local.logger')
    },
    service: {
        storage: {
            supabase: require('./supabase'),
            aws: require('./aws'),
            defaultBucketName: env.getString('SUPABASE_BUCKET_NAME')
        }
    },
    obfuscator: require('./object.obfuscator')
}
