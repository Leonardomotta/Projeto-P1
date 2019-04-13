jwt = require("jsonwebtoken");
exp = require('express')
User = require('../models/userModel')

auth = exp();

auth.post("/login", (req,res,next)=>{
    console.log(req.body)
    User.findOne({ 
       
        email : req.body.email }).then((user)=>{
            if (user.password == req.body.password){
                
            let token = jwt.sign({
                email : user.email,
                password : user.password,
                name : user.name
            },'teste');
            
            res.send(token);
            }

            else {
                res.status(403)
                res.send("wrong password");

            }
        
        }).catch(error=>{
                
                res.status(403)
                res.send("user with email  does not exists");
            });
            


            
        



}) 

auth.get("",(req,res)=>{
    console.log(req.query.token)
    res.send('oi')
    
})


module.exports = auth

