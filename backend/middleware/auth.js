const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("./catchAsyncErrors")
const jwt = require('jsonwebtoken')


exports.authorization = catchAsyncErrors( async (req,res,next)=>{
    const bearerToken = req.headers['authorization'];
    if(bearerToken===undefined){
        return next(new ErrorHandler("please login and you can access this path 1",403));
    }
    const token = bearerToken.split(" ")[1]
    if(!token){
        return next(new ErrorHandler("please login and you can access this path",403));
    }
    const decode = jwt.verify(token,process.env.JWT_SECRET);
    req.user_id = decode.id
    next()
   
})