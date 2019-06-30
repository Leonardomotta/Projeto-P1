config = require("./config/config");
rm = require("./routes/routerManager")
http = require('http');
mongoose = require('mongoose');
sio = require('socket.io')
lodash = require("lodash");
Msg = require("./models/msgModel")
User = require("./models/userModel")
jwt = require("jsonwebtoken");
conversas = require("./models/conversaModel");
usersSocket = {}
var expressLayouts = require('express-ejs-layouts')
rm.set('view engine', 'ejs')
rm.use(expressLayouts)

//Rotas para fotos
rm.use("/profile_images/", express.static(__dirname + '/uploads/users/profile_images'));
rm.use("/post_images/", express.static(__dirname + '/uploads/posts/posts_images'))


const server = http.createServer(rm);
io = sio(server);


io.on("connection", (socket) => {
    console.log("done")
    
    
    socket.on("handshake", (token) => {
        token = token.trim()
        console.log('handshake concluido')
        const user = jwt.decode(token);//
       
    
            usersSocket[user.email] = socket;

            console.log(usersSocket);
        
    })

    socket.on("Message", (msg) => {
        console.log("A mensagem eh:")
        console.log(msg)
        console.log("mensagem recebida")
        if(typeof(msg) == 'string'){msg = JSON.parse(msg.trim())}
        let remetente = msg.from
        console.log(remetente)
        let destinatario = msg.to;
        if(usersSocket[destinatario]){
        io.to(usersSocket[destinatario].emit('receive',msg))
        io.to(usersSocket[destinatario].emit('msg-notify',msg))}

        cvsid = [remetente,destinatario]
        cvsid = cvsid.sort()
        cvsid = cvsid.join()

        message = new Msg({
            remetente : remetente,
            destinatario : destinatario,
            texto: msg.texto,
            horario : new Date()
        })

        // Pegando os dois usuarios 
        //
        console.log(msg.from)
        User.findOne({email : remetente},(err,data)=>{
           
            if(!err && data != undefined){
                 
                 existe = false
                for (i = 0; i < data.conversas.length; i++) { 
                    if(data.conversas[i].identificador == cvsid){
                        existe = true;
                        data.conversas[i].mensagens.push(message)
                        data.markModified('conversas');
                        data.save(e =>{})
                        break
                    }}

                    if(existe == false){
                        cvs =  new conversas({
   
                            mensagens : [],
                            identificador : cvsid
                            
                            });
                        cvs.mensagens.push(message)
                        data.conversas.push(cvs)
                        data.markModified('conversas')
                        data.save((err)=>{})
                    }
            }

        })
        console.log(destinatario)

        User.findOne({email : destinatario},(err,data)=>{

            if(!err && data != undefined){
                existe = false
               for (i = 0; i < data.conversas.length; i++) { 
                   if(data.conversas[i].identificador == cvsid){
                       existe = true;
                       data.conversas[i].mensagens.push(message)
                       data.markModified('conversas');
                       data.save((err)=>{})
                   }}

                   if(existe == false){
                       cvs =  new conversas({
   
                           mensagens : [],
                           identificador : cvsid
                           
                           });
                       cvs.mensagens.push(message)
                       data.conversas.push(cvs)
                       data.markModified('conversas')
                       data.save((err)=>{})
                   }
           }

        })
        
            
    }
        


    )

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