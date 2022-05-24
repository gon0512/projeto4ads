const jwt = require('jsonwebtoken')

const authenticate = (req, res, next) => {
    try{
        const token = req.headers.authorization
        const decoded = jwt.verify(token, process.env.JWT_KEY)
        console.log(decoded)
    } catch(error) {
        console.log(error)
        res.status(401).send('Unauthorized!')
    }
    
    next()
}

module.exports = authenticate