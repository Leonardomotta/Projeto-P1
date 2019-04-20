mongoose = require("mongoose");
Schema = mongoose.Schema;
Pet = require(petModel);

var userSchema = new Schema({
    email: String,
    password: String,
    name: String,
    photoId: String,
    verified : Boolean,
    pets: [Pet]
}) 

var userModel = mongoose.model('User', userSchema);

module.exports = userModel;
