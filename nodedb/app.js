require('dotenv').config();
require('./config/database').connect();
const express = require('express');
const cors = require('cors');

var exampleControl = require('./controllers/exampleController');
var userControl    = require('./controllers/userController');


var app = express();

app.use(express.json());
app.use(cors());
app.use('/example',exampleControl);
app.use('/user',userControl);


module.exports = app;