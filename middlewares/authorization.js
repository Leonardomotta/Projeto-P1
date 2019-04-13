jwt = require('jsonwebtoken')
config = require('../config/config')


module.exports = (req, res, next) => {
    let token = req.headers.authorization.split(" ")[1]
    try{
        let decoded = jwt.verify(token, config.jwtSecretKey);
        next();
    }catch(err) {
        console.log(err)
        res.status(403).json({
            message: 'Auth error',
            err
        })
    }

    
}