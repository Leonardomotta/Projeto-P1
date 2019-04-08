config = require("./config/config");
rm = require("./routes/routerManager")
http = require('http');
mongoose = require('mongoose')



http.createServer(rm);



rm.listen(config.port, console.log('App on running on port:', config.port));