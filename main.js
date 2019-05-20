config = require("./config/config");
rm = require("./routes/routerManager")
http = require('http');
mongoose = require('mongoose');
sio  =  require('socket.io')
usersSocket = {}

rm.use("/profile_images/", express.static(__dirname + '/uploads/users/profile_images'));
rm.use("/post_images/", express.static(__dirname + '/uploads/posts/posts_images'))


const server =  http.createServer(rm);
io = sio(server);


io.on("connection", (socket)=>{
    console.log("done") 
})

io.on("handshake", (token)=>{
        
        //validar o token 
        // pos token validado , salvar email em um socket
        const email = "x" ; 
        if (usersSocket[email] === undefined){
            usersSocket[email] = socket.id;
            
        }
})

io.on("chat mensage",(msg) =>{

    // atributos devem ser email 
    let destinatario = msg.to;
    io.to(usersSocket[destinatario].emit('chat mensage'),msg)

}) 







server.listen(config.port, console.log('App on running on port:', config.port));