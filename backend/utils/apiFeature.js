const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Task = require("../model/task.model");
const stringSimilarity = require("string-similarity");
const User = require("../model/user.model");
const mongoose = require("mongoose");
const ApiFeature = async (user_id, query) => {
  try {
    let resultPerPage = 3;
    user_id = new mongoose.Types.ObjectId(user_id);
    let taskData = await User.aggregate([
      { $match: { _id: user_id } },
      {
        $lookup: {
          from: "tasks",
          localField: "tasks.task_id",
          foreignField: "_id",
          as: "TaskData",
        },
      },
    ]);

    if (query.status !== "undefined") {
      if (query.status === "all") {
        taskData = taskData[0].TaskData;
      } else {
        taskData = taskData[0].TaskData.filter(
          (data) => data.status === query.status
        );
      }
    }

    if (query.category !== "undefined") {
      taskData = taskData.filter((data) => data.category === query.category);
    }
    if (query.keyword !== "undefined") {
         resultPerPage = 100;
        let mostSimilarTask = [];
        let maxSimilarity = -1;
        taskData = taskData.forEach(task=>{
            const titleSimilarity = stringSimilarity.compareTwoStrings(task.title.toLowerCase(),query.keyword.toLowerCase())

            const descriptionSimilarity = stringSimilarity.compareTwoStrings(task.description.toLowerCase(),query.keyword.toLowerCase())

            const totalSimilarity = Math.max(titleSimilarity, descriptionSimilarity)
            if(totalSimilarity>maxSimilarity){
                maxSimilarity = totalSimilarity;
                mostSimilarTask.push(task);
            }
        })
        taskData = mostSimilarTask
      }

    if (taskData) {
      const countDocuments = Math.ceil(taskData.length / 3);
      const currentPage = parseInt(query.page) || 1;
      const startIndex = (currentPage - 1) * resultPerPage;
      const endIndex = currentPage * resultPerPage;
      taskData = taskData.slice(startIndex, endIndex);

      // console.log("taskData[0].TaskData",taskData)
      return { taskData, countDocuments };
    }
  } catch (error) {
    throw error.message;
  }
};

module.exports = ApiFeature;

// const Task = require('../model/task.model')
// class ApiFeature{
//     constructor(query,task,queryStr){
//         this.queryStr = queryStr;
//         this.task = task;
//         this.query = query;
//         this.currentTask = []
//     }
//     sort(){
//         if(this.queryStr.status !== undefined){
//             const task_id = this.task.map(data=> data.task_id );
//             this.currentTask = await Task.find({_id:{$in:task_id}})
//             if(this.queryStr.status==='all'){
//                 console.log("if case this.queryStr.status",this.queryStr.status)
//                this.query = Task.find()
//                return this
//             }
//             this.query = Task.find({status:this.queryStr.status})
//         }

//         return this
//     }

//     // pagination
//     pagination(resultPerPage){
//         const currentPage = parseInt(this.queryStr.page) || 1;
//         const startIndex = (currentPage-1)*resultPerPage
//         const endIndex = currentPage * resultPerPage
//        const tasks_page = this.task.slice(startIndex,endIndex)
//        const task_id = tasks_page.map(data=> data.task_id );
//        this.query = Task.find({_id:{$in:task_id}})
//        return this
//     }

// }

// module.exports = ApiFeature

// userData = await User.aggregate([{$match:{_id:user_id}},{$lookup:{from:"tasks",localField:"tasks.task_id",foreignField:"_id",as:'TaskData'}}])
// let taskData = userData[0].TaskData
// console.log("taskData",taskData,"query",query)
