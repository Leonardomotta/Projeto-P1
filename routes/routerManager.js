express = require('express');
users = require('./users');
rm = express();
var bodyParser = require('body-parser');

rm.use(bodyParser.json());

rm.use('/status', (req, res, next) => {
    res.json({status: 'Server running!'})
})

rm.use('/users', users)





module.exports = rm;