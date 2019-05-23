mongoose = require('mongoose')
Schema = mongoose.Schema
Msg = ("./msgModel");

var conversaSchema = new Schema({
    
mensagens : [],
identificador : String

});

var mensageModel = mongoose.model('Conversa',conversaSchema);

module.exports = mensageModel;