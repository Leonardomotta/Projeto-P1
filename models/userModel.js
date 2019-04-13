mongoose = require("mongoose");
Schema = mongoose.Schema;

var userSchema = new Schema({
    email: String,
    password: String,
    name: String,
    photoId: String
}) 

var userModel = mongoose.model('User', userSchema);

module.exports = userModel;
