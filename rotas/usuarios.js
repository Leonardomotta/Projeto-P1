exp = require('express') ;

usuarios = exp();


usuarios.get( "/",(req,res,next)=>{
             console.log("oi");
             res.send("oi mano")
             next();
})

module.exports = usuarios;