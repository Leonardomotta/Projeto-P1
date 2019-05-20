mongoose = require('mongoose')
Schema = mongoose.Schema
Msg = ("./msgModel");

var conversaSchema = new Schema({
    
mensagens : [Msg],
usuarios : Set

});

var mensageModel = mongoose.model("Mensage", mensageSchema);

module.exports = mensageModel;