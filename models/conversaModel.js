mongoose = require('mongoose')
Schema = mongoose.Schema
Msg = ("./msgModel");

var conversaSchema = new Schema({
    
mensagens : [Msg],
email1 : String ,
email2 : String

});

var mensageModel = mongoose.model('Conversa',conversaSchema);

module.exports = mensageModel;