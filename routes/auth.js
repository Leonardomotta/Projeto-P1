jwt = require("jsonwebtoken");
exp = require('express')
User = require('../models/userModel')

auth = exp();

auth.post("/login", (req,res,next)=>{
    


    User.findOne({ 
       
        email : req.body.email }).then((user)=>{
            if (user.password == req.body.password){ 
                let token = jwt.sign({
                    email: user.email,
                    name: user.name,
                    password : user.password
                },'teste', {noTimestamp: true});
            

            res.send(token);
            }

            else {
                res.status(403)
                res.send("Wrong password");
            }
            
        }).catch(error=>{
                
                res.status(403)
                res.send("User with that email does not exists");
            });
            
}) 

auth.get("",(req,res)=>{
    
    let token =  req.query.token;
    jwt.verify(token, 'teste', (err, decoded)=> {
    
        
        if(err) { 
            res.status(400)
            res.send("Token invalido")
        }

        else {
            
           
            User.findOne({email:decoded.email}).then((user)=>{
                
                if(user.password == decoded.password){
                    user.verified = true;
                    user.save().then(
                        res.send("Usuario alterado com sucesso")
                    ).catch(()=>{res.status(400)
                        res.send("falha ao autenticar")
                    })
                }

                else {
                    res.status(400)
                    res.send("usuario errado")
                }

             }).catch(error =>{
                res.status(400)
                res.send("Token não representa nenhum dado de nossa base")
            })

            
        }



      });
    
})


module.exports = auth

