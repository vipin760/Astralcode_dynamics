import { toast } from "react-toastify";
import { USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_REGISTER_FAIL, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS } from "./user.constants"
import axios from 'axios'

const USER_API ='http://localhost:3000/api/v2'
export const userRegister =(formData)=>async(dispatch)=>{
    try {
        dispatch({ type:USER_REGISTER_REQUEST})
        const {data} = await axios.post(`${USER_API}/user/register`,formData);
        if(data.status){
            toast.success(data.message)
        }
        dispatch({
            type:USER_REGISTER_SUCCESS,
            payload:data
        })
    } catch (error) {
        toast.error(error.response.data.message);
        dispatch({type:USER_REGISTER_FAIL,
            payload:error.message&&error.response.data.message?error.response.data.message:error.message
        })
    }
}

export const UserLogin = (formData)=> async(dispatch)=>{
    try {
        dispatch({type:USER_LOGIN_REQUEST})
        const { data } = await axios.post(`${USER_API}/user/login`,formData)
        localStorage.setItem('token',data.token);
        if(data.status){
            toast.success(data.message);
        }
        dispatch({type:USER_LOGIN_SUCCESS,
            payload:data
        })
        
    } catch (error) {
        toast.error(error.response.data.message);
        dispatch({type:USER_REGISTER_FAIL,
            payload:error.message&&error.response.data.message?error.response.data.message:error.message
        })
    }
}