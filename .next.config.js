require('dotenv').config()

module.exports = {
    env: {
        MY_SECRET: process.env.MY_SECRET
    },
    serverRuntimeConfig: {
        KEY: 'mykey'
    },
    publicRuntimeConfig: {
        OTHER_KEY: process.env.OTHER_KEY
    }
}