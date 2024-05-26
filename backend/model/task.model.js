const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title:{type:String,required:true},
    priority:{type:Boolean,default:false},
    description:{type:String,required:true},
    date:{type:String,required:true},
    category:{type:String,required:true},
    status:{type:String,required:true}
})

const Task = mongoose.model('task',taskSchema);
module.exports = Task