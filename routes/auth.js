jwt = require("jsonwebtoken");
exp = require('express')
Token = require('../models/tokenModel')
User = require('../models/userModel')

auth = exp();

auth.post("/auth", (req,res,next)=>{
    console.log(req.body)
    User.findOne({ 
       
        email : req.body.email }).then((user)=>{
            if (user.password == req.body.password){
                
            let token = jwt.sign({
                email : user.email,
                password : user.password,
                name : user.name
            },'teste');
            
            let tokenObj = new Token({token:token});

            tokenObj.save().then(()=>{
                res.json(token);
            }).catch(error=>{
                res.send("Error to saving token")
                res.status("500")
            });}

            else {
                res.status(403)
                res.send("wrong password");

            }
        
        }).catch(error=>{
                console.log(error)
                res.status(403)
                res.send("user with email  does not exists");
            });
            


            
        



}) 


module.exports = auth

