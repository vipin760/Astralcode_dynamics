import { toast } from "react-toastify";
import { USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_REGISTER_FAIL, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS } from "./user.constants"
import axios from 'axios'


const USER_API ='https://astralcode-dynamics.onrender.com/api/v2'
const getToken = () => {
    const config = {
      headers: {
        "Content-Type": "Application/json",
        "Access-Control-Allow-Origin":"*",
      },
    };
    return config;
  };
export const userRegister =(formData)=>async(dispatch)=>{
    try {
        dispatch({ type:USER_REGISTER_REQUEST})
        const config = getToken()
        const {data} = await axios.post(`${USER_API}/user/register`,formData,config);
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
        const config = getToken()
        const { data } = await axios.post(`${USER_API}/user/login`,formData,config)
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