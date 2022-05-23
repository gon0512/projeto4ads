const jwt = require('jsonwebtoken')

const authenticate = (req, res, next) => {
    console.log('Middleware!!!')
    next()
}

module.exports = authenticate