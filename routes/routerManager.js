express = require('express');
users = require('./users');
auth = require('./auth');
posts = require('./posts')
authMiddleware = require('../middlewares/authorization')
rm = express();
var bodyParser = require('body-parser');

rm.use(bodyParser.json());
rm.use(bodyParser.urlencoded({extended: true}))

rm.use('/status', authMiddleware, (req, res, next) => {
    res.json({status: 'Server running!'})
})

rm.use('/users', users)

rm.use('/auth' , auth)

rm.use(posts)







module.exports = rm;