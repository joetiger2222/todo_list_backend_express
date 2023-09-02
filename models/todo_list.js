const mongoose = require('mongoose');

const todoListShcema= new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    isChecked:{
        type:Boolean,
        required:true,
        default:false,
    },
    userId:{
        type:String,
        required:true,
    }
})

module.exports = mongoose.model('todoListShcema', todoListShcema);