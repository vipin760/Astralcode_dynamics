const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true,select:false},
    tasks:[
        {task_id:{type:mongoose.Schema.ObjectId,ref:'tasks'}},
    ]
})

const User = mongoose.model("user",userSchema);
module.exports = User