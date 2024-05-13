const mongoose = require('mongoose')
const catchAsyncErrors = require('../middleware/catchAsyncErrors');

const connectDatabase=catchAsyncErrors(()=>{
        mongoose.connect(process.env.DB_URL).then((data)=>{
          console.log(`database connected on ${data.connection.port}`); 
        })
})

module.exports=connectDatabase;