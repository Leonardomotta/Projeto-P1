mongoose = require('mongoose')
Schema = mongoose.Schema

var statusSchema = new Schema({
    status: Boolean,
    authorName: String,
    authorEmail: String,
    content: String,
    photoId: String
});

var statusModel = mongoose.model("Status", statusSchema);

module.exports = statusModel;
