const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title:{type:String,required:true},
    description:{type:String,required:true},
    category:{type:String,required:true},
    status:{type:String,required:true}
})

const Task = mongoose.model('task',taskSchema);
module.exports = Task