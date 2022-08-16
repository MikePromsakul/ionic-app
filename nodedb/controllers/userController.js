const express = require('express');
var router = express.Router();
const ExampleModel = require('../models/example');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');

router.post("/signup", async (req, res) => {
    try {
        // Get user input
        const { firstname, lastname, email, password } = req.body;
            
        if (!(email && password && firstname && lastname)) {
          res.status(400).send("All input is required");
        }
        
        const oldUser = await ExampleModel.findOne({email});
        if (oldUser) {
          return res.status(409).send("User Already Exist. Please Login");
        }
        //Encrypt user password
        encryptedPassword = await bcrypt.hash(password, 10);
        // Create user in our database
        const user = await ExampleModel.create({
          firstname,
          lastname,
          email: email.toLowerCase(), // sanitize: convert email to lowercase
          password: encryptedPassword,
        });
        // Create token
        const token = jwt.sign(
          { user_id: user._id, email },
          process.env.TOKEN_KEY,
          {
            expiresIn: "2h",
          }
        );
        // save user token
        user.token = token;
    
        // return new user
        res.status(201).json(user);
      } catch (err) {
        console.log(err);
        res.status(400).json("Process error");
      }

});

router.post('/signin', async (req, res) => {

    try{

        const { email, password } = req.body;

        if(!(email && password)){
            res.status(400).send("All in put is required");
        }

        const user = await ExampleModel.findOne({ email });
        if(user && (await bcrypt.compare(password, user.password))) {
            const token = jwt.sign(
                { user_id: user._id, email },
                process.env.TOKEN_KEY,
                { expiresIn: "2h" }
            );
            user.token = token;

            res.status(200).json(user);
        }else{
            res.status(400).send("Invalid Credentials");
        }


    }catch(error){
        console.log(err);
    }

});

router.get("/getexample", async (req, res) => {

    ExampleModel.find((err, doc) => {
        if(!err){ res.status(200).json(doc); }
        else{ res.status(400).send('Error : '+ JSON.stringify(err, undefined,2)); }
    });

});

router.get('/welcome', (req, res) => {
    res.status(200).send('welcome');
});

module.exports = router;