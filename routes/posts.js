express = require('express')
posts = express()
authMiddleware = require('../middlewares/authorization')
jwt = require('jsonwebtoken')
multer = require('multer')
uuid = require('uuid/v1')
Post = require('../models/postModel')
User = require('../models/userModel')

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/posts/posts_images')
    },
    filename: (req, file, cb) => {
        cb(null, uuid() +"."+ file.mimetype.split("/")[1])
    }
})

upload = multer({storage: storage})

// To save a new post
posts.post('/posts', authMiddleware, upload.single('photo'), (req, res, next) => {
    token = req.headers.authorization.split(" ")[1];
    tokenContent = jwt.decode(token);
    if(!req.body.content){
        res.status(400).json("Post content needed!")
    }
    var post = {
        authorName: tokenContent.name,
        authorEmail: tokenContent.email,
        title: req.body.title,
        content: req.body.content,
        photoId: req.file.filename,
        createdAt: new Date(),
        postType: req.body.postType
    };
    Post.create(post, (err, createdPost) => {
        if(err) {
            res.status(500);
        }else{
            res.status(200).json(createdPost)
        }
    })
});

//To get all posts
posts.get("/posts", authMiddleware, (req, res, next) => {
    Post.find({}, (err, posts) => {
        if(err){
            res.status(500)
        }else{
            posts.sort((postA, postB) => {
                return postB.createdAt - postA.createdAt;
            });
            res.status(200).json(posts)
        }
    })
})

//To get an specific post
posts.get("/posts/:postId", authMiddleware, (req, res, next) => {
    Post.findById( req.params.postId, (err, post) => {
        if(err){
            res.status(500)
        }else{          
            res.status(200).json(post);
        }
    })
})

//Delete a post by specifying an id
posts.delete("/posts/:postId", authMiddleware, (req, res, next) => {
    Post.findByIdAndRemove(req.params.postId, (err, removedPost) => {
        if(err){
            res.status(500).json("Error while removing post!")
        }else{
            res.status(200).json(removedPost)
        }
    })
})

module.exports = posts;
