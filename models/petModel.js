mongoose = require("mongoose");
Schema = mongoose.Schema;

var petSchema = new Schema({
    name: String,
    type: String,
    breed: String,
    photoId: [String]
}); 

var petModel = mongoose.model('Pet', petSchema);

module.exports = petModel;
