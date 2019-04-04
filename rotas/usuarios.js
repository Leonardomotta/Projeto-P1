exp = require('express') ;

usuarios = exp();


usuarios.get( "/",(req,res,next)=>{
             res.send("oi mano")
             next();
})

module.exports = usuarios;