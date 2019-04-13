exp = require('express') ;
User = require('../models/userModel')
users = exp();
authorizationMiddleware = require('../middlewares/authorization')
jwt = require('jsonwebtoken')
multer = require('multer')
mail = require("../mailer/mail")

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/users/profile_images")
    },
    filename: (req, file, cb) => {
        token = req.headers.authorization.split(" ")[1]
        tokenContent = jwt.decode(token)
        cb(null, tokenContent.email + "." + file.mimetype.split("/")[1])
    }
});

upload = multer({dest: 'uploads/users/', storage: storage})


users.post('/create', (req, res, next) => {
    
    User.findOne({email: req.body.email}, (err, user) => {
        if(!user){
            if(req.body.email && req.body.password && req.body.name){
            var usr = new User({
                email :req.body.email,
                password : req.body.password,
                name : req.body.name,
                verified: false
            });
            usr.save()
                .then(()=>{

                    token = jwt.sign({
                        email: usr.email,
                        name: usr.name,
                        password: usr.password
                    
                    },'novoUsuario');

                    mail(usr.email,token,usr.name)

                    res.json({success: "User created!"})
        }).catch(e=>{
                    res.send('Cannot save user')
                    res.status(500);
                })}
            else {
                res.status(400)
                res.send("Bad request")
            }
                
        }else{
            res.json({error: "Current user already exists"})
        }
    })
});

users.get("/user", authorizationMiddleware, (req, res, next) => {
    token = req.headers.authorization.split(" ")[1]
    tokenContent = jwt.decode(token)
    User.findOne({email: tokenContent.email}, (err, user) => {
        if(err){
            res.status(404).json({err})
        }else{
            res.status(200).json(user)
        }
    })
});


users.put("/user", authorizationMiddleware, upload.single("photo"), (req, res, next) => {

    token = req.headers.authorization.split(" ")[1]
    tokenContent = jwt.decode(token)
    User.findOne({email: tokenContent.email}, (err, user) => {
        if(err){
            res.status(404).json(err)
        }else{
            if(req.body.name){
                user.name = req.body.name;
            }
            if(req.file){
                user.photoId = tokenContent.email + "." + req.file.mimetype.split("/")[1];
            }
            user.save().then(
                res.status(200).json({
                    message: 'User updated!'
                })
            ).catch(e => {
                res.status(500).json(e)
            })
        }
    })
})



module.exports = users;