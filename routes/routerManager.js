express = require('express');
users = require('./users');
auth = require('./auth')
authMiddleware = require('../middlewares/authorization')
rm = express();
var bodyParser = require('body-parser');

rm.use(bodyParser.json());

rm.use('/status', authMiddleware, (req, res, next) => {
    res.json({status: 'Server running!'})
})

rm.use('/users', users)

rm.use('/auth' , auth)







module.exports = rm;