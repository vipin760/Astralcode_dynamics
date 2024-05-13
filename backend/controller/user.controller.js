const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const bcrypt = require('bcrypt'); 
const User = require('../model/user.model');
const ErrorHandler = require('../utils/errorHandler')
const jwt = require('jsonwebtoken')

const generateToken = (userData)=>{
    return jwt.sign({id:userData._id},process.env.JWT_SECRET,{expiresIn:process.env.JWT_EXPIRE*24*60*60*1000})
}

exports.getSampleData=catchAsyncErrors( async (req,res,next)=>{
    res.status(200).send({message:"successfully accept data..."})
})

exports.userRegister=catchAsyncErrors(async(req,res,next)=>{
    const emailExist = await User.findOne({email:req.body.email});
    if(emailExist){
        return next (new ErrorHandler("email already exist",401))
    }
    const passwordHash = await bcrypt.hash(req.body.password,parseInt(process.env.SALT));
    req.body.password = passwordHash
    await User.create(req.body).then((data)=>{
        console.log(data);
        res.status(200).send({message:`hello ${data.name} ,your registration completed`});
    })
})

exports.userLogin=catchAsyncErrors( async(req,res,next)=>{
    const userData = await User.findOne({email:req.body.email}).select("+password")
    if(!userData){
        return next(new ErrorHandler("incorrect email or password"))
    }
    const passwordMatch = await bcrypt.compare(req.body.password,userData.password)
    if(!passwordMatch){
        return next(new ErrorHandler("incorrect email or password")) 
    }
    const token = generateToken(userData)
    res.status(200).send({message:'user login success',token:token});
})