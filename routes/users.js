exp = require('express') ;
User = require('../models/userModel')
users = exp();
authorizationMiddleware = require('../middlewares/authorization')
jwt = require('jsonwebtoken')


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
                .then(
                    res.json({success: "User created!"})
                ).catch(e=>{
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




module.exports = users;