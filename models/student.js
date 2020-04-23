const mongoose = require('mongoose');

const student = mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    class: {
        type: String,
            require: true
    },
    address: {
        type: String,
        require: true
    },
    birthday:{
        type: Date,
        require:true
    },
    idteacher: {
        type: String,
        require: true
    },
})

module.exports=mongoose.model('Student',student)