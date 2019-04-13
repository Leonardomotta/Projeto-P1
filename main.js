config = require("./config/config");
rm = require("./routes/routerManager")
http = require('http');
mongoose = require('mongoose');

rm.use("/profile_images/", express.static(__dirname + '/uploads/users/profile_images'));


http.createServer(rm);



rm.listen(config.port, console.log('App on running on port:', config.port));