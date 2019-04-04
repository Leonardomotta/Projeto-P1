express = require('express');
usuarios = require('./usuarios');
rm = express();


rm.use('/usuarios',usuarios)


rm.use("/", (req,res,next)=>{
    res.send("bem vindo");
    
})



module.exports = rm;