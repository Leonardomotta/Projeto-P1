mongoose = require('mongoose')
Schema = mongoose.Schema

var mensageSchema = new Schema({
    remetente : String,
    destinatario : String,
    texto: String,
    horario : String
});

var mensageModel = mongoose.model("Mensage", mensageSchema);

module.exports = mensageModel;