mongoose = require('mongoose')
Schema = mongoose.Schema

var postSchema = new Schema({
    authorName: String,
    authorEmail: String,
    title: String,
    content: String,
    photoId: String,
    createdAt: { type: Date },
    postType: {
        type: String,
        enum: ['lost-animal', 'adoption', 'crossing']
    }
});

var postModel = mongoose.model("Post", postSchema);

module.exports = postModel;