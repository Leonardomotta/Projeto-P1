jwt = require("jsonwebtoken");
exp = require('express')
Token = require('../models/tokenModel')
User = require('../models/userModel')

auth = exp();

auth.post("/auth", (req,res,next)=>{

    User.findOne({ email : req.body.email , 
        password:req.body.password},(err,user)=>{

            if(err){
                res.json({error : err})
            }

            else {
                let token = jwt.sign({email:user.email,
                password : user.password},'teste');
                
                let tokenObj = new Token({token:token});

                tokenObj.save().then(()=>{
                    res.json(token);
                });
                
            }

        })



}) 


module.exports = auth

