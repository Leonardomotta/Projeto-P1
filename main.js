express = require('express');
config = require("./Libs_Auxiliares/config");
rm = require("./rotas/routerManager")
http = require('http');



const server = http.createServer(rm);
console.log(config.port)



rm.listen(config.port);