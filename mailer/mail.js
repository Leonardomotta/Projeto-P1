const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;


'use strict';

 
nodemailer.createTestAccount((err, account) => {
    let transporter = nodemailer.createTransport({
        host: 'smtp.googlemail.com', 
        port: 465 , 
        secure: true, 
        auth: {
            user: 'doguinho.noreply@gmail.com', 
            pass: '@leo12345' 
        }
    });
 
    
    
 
 
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
    });
});


module.exports = transporter;