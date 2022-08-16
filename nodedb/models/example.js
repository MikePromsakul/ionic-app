const mongoose = require('mongoose');

const exampleSchema = new mongoose.Schema(
    {
        email     :   { type: String, unique: true },
        password  :   { type: String, default: null },
        firstname :   { type: String, default: null },
        lastname  :   { type: String, default: null },
        token     :   { type: String }
        
    },
    {
        collection: 'exampledata'
    }    
);

module.exports = mongoose.model('example', exampleSchema);