module.exports = {
    env: {
        browser: true,
        commonjs: true,
        es2021: true
    },
    extends: 'eslint:recommended',
    parserOptions: {
        ecmaVersion: 'latest'
    },
    plugins: ['sort-keys-fix'],
    rules: {
        'no-fallthrough': 'off',
        'no-implicit-globals': 'off',
        'no-undef': 'off',
        'no-unused-vars': [
            'error',
            { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }
        ],
        'no-var': 'error',
        'prefer-const': 'error',
        'sort-keys': 'error',
        'sort-keys-fix/sort-keys-fix': 'error'
    }
}
