mongoose = require("mongoose");
Schema = mongoose.Schema;

let tokenSchema = new Schema({
    token : String
}) 

var tokenModel = mongoose.model('Token', tokenSchema);

module.exports = tokenModel;