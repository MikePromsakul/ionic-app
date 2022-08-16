const express = require('express');
var router = express.Router();
const ExampleModel = require('../models/example');

router.post("/postexample", async (req, res) => {
    try{
        const {  firstname,lastname,email } = req.body;

        const example = await ExampleModel.create({
            firstname,
            lastname,
            email
        });

        res.status(200).json(example);

    }catch(error){
        res.status(400).json("Process error");
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