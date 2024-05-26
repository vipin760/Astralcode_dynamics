import axios from "axios";
import { toast } from "react-toastify";
import {
  TASK_CREATE_FAIL,
  TASK_CREATE_REQUEST,
  TASK_CREATE_SUCCESS,
  TASK_DELETE_REQUEST,
  TASK_DELETE_SUCCESS,
  TASK_EDIT_FAIL,
  TASK_EDIT_REQUEST,
  TASK_EDIT_SUCCESS,
  TASK_GET_FAIL,
  TASK_GET_REQUEST,
  TASK_GET_SUCCESS,
  TASK_PRIORITY_FAIL,
  TASK_UPDATE_FAIL,
  TASK_UPDATE_REQUEST,
  TASK_UPDATE_SUCCESS,
} from "./task.constants";
import { USER_API } from "../../api";

const getToken = () => {
  const token = localStorage.getItem("token");
  const config = {
    headers: {
      "Content-Type": "Application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  return config;
};

export const TaskCreate = (formData) => async (dispatch) => {
  try {
    dispatch({ type: TASK_CREATE_REQUEST });
    const config = getToken();
    const { data } = await axios.post(
      `${USER_API}/task/create`,
      formData,
      config
    );
    if (data.status) {
      toast.success(data.message);
    }
    dispatch({ type: TASK_CREATE_SUCCESS, payload: data });
  } catch (error) {
    toast.error(error.response.data.message);
    dispatch({
      type: TASK_CREATE_FAIL,
      payload:
        error.message && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const TaskGet = (qry,page,search,category) => async (dispatch) => {
  try {
    console.log(qry,page,category)
    dispatch({ type: TASK_GET_REQUEST });
    const config = getToken();
    if(qry===undefined){
      qry= 'all'
    }
    const { data } = await axios.get(`${USER_API}/task?status=${qry}&&page=${page}&&keyword=${search}&&category=${category}`, config);
    dispatch({ type: TASK_GET_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: TASK_GET_FAIL,
      payload:
        error.message && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const SingleTaskFetch=(id)=>async(dispatch)=>{
    try {
        dispatch({type:TASK_EDIT_REQUEST})
        const config = getToken()
        const { data } = await axios.get(`${USER_API}/task/${id}`,config)
        dispatch({type:TASK_EDIT_SUCCESS,payload:data})

    } catch (error) {
        toast.error(error.response.data.message)
        dispatch({type:TASK_EDIT_FAIL,payload:error.message&&error.response.data.message?error.response.data.message:error.message})
    }
}

export const SingleTaskUpdate=(id,formData)=>async(dispatch)=>{
    try {
        dispatch({type:TASK_UPDATE_REQUEST})
        const config=getToken()
        const { data } = await axios.put(`${USER_API}/task/${id}`,formData,config)
        if(data.status){
            toast.success(data.message)
        }
        dispatch({type:TASK_UPDATE_SUCCESS,taskData:data});
        
    } catch (error) {
        toast.error(error.response.data.message)
        dispatch({type:TASK_UPDATE_FAIL,payload:error.message&&error.response.data.message?error.response.data.message:error.message})
    }
}

export const DeleteTask =(id)=>async(dispatch)=>{
    try {
        dispatch({type:TASK_DELETE_REQUEST})
        const config = getToken();
        const { data } =await axios.delete(`${USER_API}/task/${id}`,config)
        dispatch({type:TASK_DELETE_SUCCESS,taskData:data})
        
    } catch (error) {
        toast.error(error.response.data.message)
        dispatch({type:TASK_UPDATE_FAIL,payload:error.message&&error.response.data.message?error.response.data.message:error.message})
    }
}

export const TogglePriority=(id)=>async(dispatch)=>{
  try {
    const { data } = await axios.patch(`${USER_API}/task/${id}`)
  } catch (error) {
    dispatch({TASK_PRIORITY_FAIL, payload:error.message&&error.response.data.message?error.response.data.message:error.message})
  }
}