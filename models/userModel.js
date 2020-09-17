mongoose = require("mongoose");
Conversa = require("./conversaModel")
Schema = mongoose.Schema;

var userSchema = new Schema({
    email: String,
    password: String,
    name: String,
    lastName: String,
    photoId: String,
    verified: Boolean,
    address: String,
    additionalInfo: String,
    conversas: []
})

var userModel = mongoose.model('User', userSchema);

module.exports = userModel;
