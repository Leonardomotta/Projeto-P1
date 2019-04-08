exp = require('express') ;
User = require('../models/userModel')
users = exp();


users.post('/create', (req, res, next) => {
    console.log(req.body)
    User.findOne({email: req.body.email}, (err, user) => {
        if(!user){
            var usr = new User(req.body);
            usr.save()
                .then(
                    res.json({success: "User created!"})
                )
        }else{
            res.json({error: "Current user already exists"})
        }
    })
});

module.exports = users;