express = require('express');
usuarios = require('./usuarios');
rm = express();

rm.use('/usuarios',usuarios)




module.exports = rm;