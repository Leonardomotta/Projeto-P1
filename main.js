config = require("./config/config");
rm = require("./routes/routerManager")
http = require('http');
mongoose = require('mongoose');
sio = require('socket.io')
lodash = require("lodash");
Msg = require("./models/msgModel")
jwt = require("jsonwebtoken");
conversas = require("./models/conversaModel");
usersSocket = {}

rm.use("/profile_images/", express.static(__dirname + '/uploads/users/profile_images'));
rm.use("/post_images/", express.static(__dirname + '/uploads/posts/posts_images'))


const server = http.createServer(rm);
io = sio(server);


io.on("connection", (socket) => {
    console.log("done")
    
    
    socket.on("handshake", (token) => {
        
        const user = jwt.decode(token);
       
        if (usersSocket[user.email] === undefined) {
            usersSocket[user.email] = socket;
        }
    })

    socket.on("Message", (msg) => {
        
        msg = JSON.parse(msg)
        let remetente = msg.from
        let destinatario = msg.to;
       
        io.to(usersSocket[destinatario].emit('receive'), msg)
        io.to(usersSocket[destinatario].emit('msg-notify'), msg)


    })

    socket.on("New post", ()=>{

        for(i in usersSocket) {
            io.to(usersSocket[i].emit('new post'), msg)
        }

        
    })


    


    socket.on("close session", (email) => {
        usersSocket[email] = undefined;
    })
})













server.listen(config.port, console.log('App on running on port:', config.port));