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
    env: require('./environment')
}
