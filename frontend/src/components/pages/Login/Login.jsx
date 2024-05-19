import React, { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux'
import { UserLogin } from '../../../redux/users/user.action'
const USER_API = "http://localhost:3000/api/v2"

const Login = () => {
    const dispatch = useDispatch();
    const[ FormData,setFormData]=useState({email:'',password:''})
    const [Errors,setErrors] =useState({})
    const [Show,setShow] = useState(true)

    const handleChange=(e)=>{
        const { name,value}=e.target
        setFormData({...FormData,[name]:value})
    }
    const handleSubmit=async(e)=>{
        e.preventDefault()
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const validationErrors={}

        if(!FormData.email.trim()){
            validationErrors.email="please enter you email"
        }else if(!emailRegex.test(FormData.email)){
            validationErrors.email="please valid email address"
        }

        if(!FormData.password.trim()){
            validationErrors.password="please enter your password"
        }

        setErrors(validationErrors)
        if(Object.keys(validationErrors).length===0){
            dispatch(UserLogin(FormData)).then(_d=>{
                setTimeout(() => {
                    window.location.href="/home"
                }, 1000);
            })
        }
    }

    const passwordShow =()=>{
        setShow(!Show)
    }

  return (
    <section className="bg-gray-50 min-h-screen flex items-center justify-center transition ease-in-out delay-150">

    <div className="bg-gray-100 flex shadow-lg max-w-3xl p-5">
                    
                    <div className="w-1/2 p-5 sm:block hidden">
                        <img className="rounded-2xl" src="https://images.pexels.com/photos/3913025/pexels-photo-3913025.jpeg?auto=compress&cs=tinysrgb&w=400" />
                   </div>

        <div className="sm:w-1/2 px-16 mt-10">
            <h2 className="font-bold text-2xl">Login</h2>
            <p className="text-sm mt-4">already member</p>
            <form action="" className="flex flex-col gap-4" onSubmit={handleSubmit}>
                

                <div className='relative'>
                <input type="text" name='email' placeholder="email" className="p-2 rounded-xl border w-full" onChange={handleChange} />
                {Errors.email&&(
                    <p className='text-sm text-red-700'>&nbsp; * {Errors.email}</p>
                )}
                </div>
                
                  <div>
                  <div className="relative">
                    <input type={Show?"password":"text"} name='password' placeholder="password" className="p-2 rounded-xl border w-full" onChange={handleChange} />
                    <i className="fa-solid fa-eye absolute top-1/2 right-2 -translate-y-1/2" onClick={passwordShow} ></i>
                </div>
                {Errors.password&&(
                    <p className='text-sm text-red-700'>&nbsp; * {Errors.password}</p>
                )}
                  </div>
        
                <button className="bg-blue-800 p-2 rounded-xl text-white transition delay-180 hover:scale-1 duration-300">Login</button>
            </form>

    
                    <div className="mt-3 text-xs flex justify-between items-center">
                        <p>create an account</p>
                        <a href="/register" className="bg-white py-2 px-5 rounded-xl border-b">Register</a>
                    </div>
        </div>
    </div>
</section>
  )
}

export default Login
