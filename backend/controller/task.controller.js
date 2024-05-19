const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Task = require("../model/task.model");
const User = require("../model/user.model");
const ApiFeature = require("../utils/apiFeature");
const ErrorHandler = require('../utils/errorHandler')

exports.createTask = catchAsyncErrors( async (req,res,next)=>{
    await Task.create(req.body).then(async(data)=>{
        const userData = await User.findById(req.user_id);
        if(userData){
            const obj ={
                task_id:data._id
            }
            userData.tasks.push(obj)
            await userData.save()
            res.status(200).send({status:true,message:"task created successfully"})
        }
    })
})

exports.getTask = catchAsyncErrors( async(req,res,next)=>{
    let userData = await User.findById(req.user_id);
    const apiFeature =await ApiFeature(userData.tasks,req.query)
    
    if(apiFeature){
       return res.status(200).send({data:apiFeature.taskData,countDocuments:apiFeature.countDocuments})
    }
    
    
})
 
exports.singleTaskFetch = catchAsyncErrors( async(req,res,next)=>{
    const taskData = await Task.findById(req.params.id);
    if(!taskData){
        return next(new ErrorHandler("task not found",404))
    }
    return res.status(200).send({status:true,data:taskData})
})

exports.singleTaskUpdate=catchAsyncErrors(async(req,res,next)=>{
await Task.findByIdAndUpdate(req.params.id,req.body).then(data=>{
    res.status(200).send({status:true,message:"task updated successfully"});
})
})

exports.taskDeleted=catchAsyncErrors( async(req,res,next)=>{
    await Task.findByIdAndDelete(req.params.id).then(data=>{
        res.status(200).send({status:true,message:"task deleted successfully"});
    })
})
