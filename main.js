config = require("./Libs_Auxiliares/config");
rm = require("./rotas/routerManager")
http = require('http');


http.createServer(rm);
console.log(config.port)



rm.listen(config.port);