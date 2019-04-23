express = require('express');
users = require('./users');
pets = require('./pets');
auth = require('./auth');
authMiddleware = require('../middlewares/authorization')
rm = express();
var bodyParser = require('body-parser');

rm.use(bodyParser.json());

rm.use('/status', authMiddleware, (req, res, next) => {
    res.json({status: 'Server running!'})
})

rm.use('/users', users)

rm.use('/auth' , auth)

rm.use('/users/user/pet', pets);





module.exports = rm;