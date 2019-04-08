let mongoose = require('mongoose');

config = {};

// ATENÇÃO  senha deve ser passada como paramentro ao executar a aplicação // 

config.senha =  process.argv[2];
config.port = (process.env.port || 3000 ); 
config.conection_string = "mongodb+srv://admin:"+config.senha+"@cluster0-rztiw.mongodb.net/test?retryWrites=true";
config.DB = mongoose;
config.DB.connect(config.conection_string , {useNewUrlParser: true})
        .then(console.log("DB connected"));

module.exports =  config;