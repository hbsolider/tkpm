const mongoose = require('mongoose')

const Class = mongoose.Schema({
    number:{
        type:String,
        require: true
    },
    description:{
        type:String,
        require: true
    },
    idteacher:{
        type:String,
        require: true
    },
    dateCreate:{
        type:Date,
        default:Date.now
    }
})
module.exports=mongoose.model('Class',Class);