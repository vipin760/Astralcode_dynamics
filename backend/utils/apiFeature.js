const catchAsyncErrors = require("../middleware/catchAsyncErrors")
const Task = require('../model/task.model')
const stringSimilarity = require('string-similarity');
const ApiFeature =async(task,query)=>{
    try {
        console.log(query)
        let taskData= task.map(data=>data.task_id)
        const resultPerPage = 3
        
    if(query.status !== 'undefined'){
        if(query.status==='all'){
            taskData = await Task.find()
        }else{
            taskData = await Task.find({_id:{$in:taskData},status:query.status})
        }
    }

    if(query.category === 'undefined'){
        taskData = taskData.filter(data=> {
            return data ===queueMicrotask.category
        } )
       
    }

    if(query.keyword !== 'undefined'){
        taskData = taskData.filter(data=>{
            return data.title===query.keyword
        })
    }
    
    
    if(taskData){
        const countDocuments = Math.floor(taskData.length/3)
        const currentPage = parseInt(query.page) || 1;
        const startIndex = (currentPage-1)*resultPerPage
        const endIndex = currentPage * resultPerPage
        taskData = taskData.slice(startIndex,endIndex)
        return {taskData,countDocuments}
    }
    
    } catch (error) {
     throw error.message  
    }
}
 

module.exports = ApiFeature



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

