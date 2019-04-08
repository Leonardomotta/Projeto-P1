config = require("./Libs_Auxiliares/config");
rm = require("./rotas/routerManager")
http = require('http');


http.createServer(rm);



rm.listen(config.port);