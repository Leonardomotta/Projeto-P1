exp = require('express') ;
User = require('../models/userModel')
users = exp();


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

module.exports = users;