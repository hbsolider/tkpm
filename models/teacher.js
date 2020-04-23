const mongoose = require('mongoose')

const teacherSchema = new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true,
    },
    password:{
        type:String,
        require: true
    },
    address:{
        type:String,
    }
})

module.exports = mongoose.model('Teacher',teacherSchema)