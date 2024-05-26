import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { SingleTaskFetch, SingleTaskUpdate } from '../../../redux/tasks/task.action'

const Edit = () => {
    const {id} = useParams()
    const [FormData,setFormData]=useState({
        title:'',description:'',category:'',status:'',date:''
    })
    const [Errors,setErrors]=useState({})
    const TaskDetails = useSelector(state=>state.TaskDetails)

    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(SingleTaskFetch(id))
    },[dispatch])
   
    useEffect(()=>{
        if(TaskDetails.taskData&&TaskDetails.taskData.data){
            setFormData(TaskDetails.taskData.data);
        }
    },[TaskDetails])
    

    const handleChange=(e)=>{
        const {name,value} = e.target
        setFormData({
            ...FormData,[name]:value
        })  
    }
    const handleSubmit=async(e)=>{
        e.preventDefault()
        FormData.category=e.target.category.value
        FormData.status=e.target.status.value
        const validationErrors = {}
        if(!FormData.title.trim()){
            validationErrors.title = "Please enter title name"
        }else if(FormData.title.length<3){
            validationErrors.title ='please enter atleast 3 character'
        }

        if(!FormData.description.trim()){
            validationErrors.description="please enter description"
        }else if(FormData.description.length<6){
            validationErrors.description="please enter atleast 6 character"
        }
        if(!FormData.date.trim()){
            validationErrors.date="please select date"
        }
        setErrors(validationErrors)
        if(Object.keys(validationErrors).length===0){
            dispatch(SingleTaskUpdate(id,FormData)).then((data)=>{
                window.location.href="/home"
            })
        }
    }

    
  return (
    <div className='min-h-screen flex items-center justify-center'>
    <div className='shadow-lg border'>
        <form className='flex flex-col p-5' onSubmit={handleSubmit}>
            <h3 className='text-white text-center text-3xl'>Edit Task</h3>
            <input type="text" name='title' className='m-1 rounded-lg text-center' placeholder='Enter Title...' value={FormData.title} onChange={handleChange} />
            {Errors.title&&(
                <p>{Errors.title}</p>
            )}
            <textarea type="text" name='description' className='m-1 rounded-lg text-center' placeholder='Description...' value={FormData.description} onChange={handleChange}/>
            {Errors.description&&(
                <p>{Errors.description}</p>
            )}
            <input type="date" name='date' value={FormData.date} className='m-1 rounded-lg text-center' placeholder='Enter Title...' onChange={handleChange} />
                {Errors.date&&(
                    <p>{Errors.date}</p>
                )}
            <select name="category" id="" className='m-1 rounded-lg text-center' value={FormData.category} onChange={handleChange}>
                <option value="work">work</option>
                <option value="personel">personel</option>
                <option value="errands">errands</option>
            </select>

            <select name="status" id="" className='m-1 rounded-lg text-center' value={FormData.status} onChange={handleChange}>
                <option value="pending">pending</option>
                <option value="progress">progress</option>
                <option value="completed">completed</option>
            </select>
            <button type='submit' className='bg-violet-950 rounded-2xl text-center text-white p-2 m-1 hover:bg-violet-900'>submit</button>
        </form>
    </div>
</div>
  )
}

export default Edit
