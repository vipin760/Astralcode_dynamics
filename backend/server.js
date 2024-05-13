const app = require('./app');
const dotenv = require('dotenv');
const connectDatabase = require('./config/database');



//handling uncaughtException
process.on("uncaughtException",err=>{
    console.log(`Error: ${err.message}`);
    console.log('shutting down the server due to uncaughtException');
    process.exit(1)
})

// config
if(process.env.NODE_ENV !== "production"){
    require('dotenv').config({path:'./config/.env'});
}

const port = process.env.PORT


// connect database
connectDatabase();

const server = app.listen(port,()=>{
    console.log(`server connected on port ${port}`)
} )

// unhandledRejection 
process.on("unhandledRejection",err=>{
    console.log(`Error: ${err.message}`);
    console.log('shutting down the server due to unhandled promise rejection');
    server.close(()=>{
        process.exit(1)
    })
})