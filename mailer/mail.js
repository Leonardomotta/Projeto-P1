const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;


'use strict';

enviar =  (email,token,name)=>{
nodemailer.createTestAccount((err, account) => {
    const transporter = nodemailer.createTransport({
        host: 'smtp.googlemail.com', 
        port: 465 , 
        secure: true, 
        auth: {
            user: 'doguinho.noreply@gmail.com', 
            pass: '@leo12345' 
        }
    });
 
    
    mailOptions = {
        from: 'doguinho.noreply@gmail.com',
        to: email, 
        subject: 'Email de Verificação',
        text: name + " clique no link de verificação para confirmar seu endereço de email \n \n "+"https://limitless-everglades-23167.herokuapp.com/auth?token="+token
        };


 
 
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
    });
});


}

module.exports = enviar