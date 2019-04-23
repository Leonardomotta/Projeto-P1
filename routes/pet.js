express = require('express');
jwt = require('jsonwebtoken');
multer = require('multer');
authorizationMiddleware = require('../middlewares/authorization');
User = require('../models/userModel');
Pet = require('../models/petModel');
pets = express();

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/pets/pets_images");
    },
    filename: (req, file, cb) => {
        cb(null, req.body.name + "-" + Date.now() +"." + file.mimetype.split("/")[1]);
    }
});

upload = multer({
    storage: storage
}).array('petPhotos', 3);


pets.post('/create', authorizationMiddleware, (req, res) => {
    token = req.headers.authorization.split(" ")[1];
    tokenContent = jwt.decode(token);

    User.findOne({email: tokenContent.email}, (err, user) => {
        if(user){            
            if(req.body.name && req.body.type){
                upload(req, res, (error) => {
                    if(error){
                      res.send('Image upload error: ' + error);
                    } else{
                        //como pegar todos os nomes de foto adicionadas?
                        //como a req passa a lista de imagens?
                    }
                });

                var newPet = new Pet({
                    name: req.body.name,
                    type: req.body.type,
                    breed: req.body.breed,
                    photoId: a //como adicionar essa lista aqui?
                });
                
                pet.save()
                .then(()=>{
                    res.send("Pet created!");
                }).catch(e=>{
                    res.send('Cannot save user');
                    res.status(500);
                })
            }else {
                res.status(400);
                res.send("Bad request");
            }
                
        }else{
            res.send("This user does't exist.");
        }
    })
});

module.exports = pets;