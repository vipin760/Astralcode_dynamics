import React, { useState } from 'react'
import  { useDispatch } from 'react-redux'
import { TaskCreate } from '../../../redux/tasks/task.action'
import axios from 'axios'
const Create = () => {
    const [FormData,setFormData] =useState({title:'',description:'',category:'',status:''})
    const [Errors,setErrors]=useState({})
    const dispatch = useDispatch()
    const handleChange=(e)=>{
        setErrors({})
        const {name,value}=e.target
        setFormData({
            ...FormData,[name]:value
        })
    }
    const handleSubmit =async(e)=>{
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
        setErrors(validationErrors)
        if(Object.keys(validationErrors).length===0){
            dispatch(TaskCreate(FormData)).then((data)=>{
                window.location.href="/home"
            })
        }
    }
  return (
    <div className='min-h-screen flex items-center justify-center'>
        <div className='shadow-lg border'>
            <form action="" className='flex flex-col p-5' onSubmit={handleSubmit}>
                <h3 className='text-white text-3xl'>Create Note</h3>
                <input type="text" name='title' className='m-1 rounded-lg text-center' placeholder='Enter Title...' onChange={handleChange} />
                {Errors.title&&(
                    <p>{Errors.title}</p>
                )}
                <textarea type="text" name='description' className='m-1 rounded-lg text-center' placeholder='Description...' onChange={handleChange}/>
                {Errors.description&&(
                    <p>{Errors.description}</p>
                )}
                <select name="category" id="" className='m-1 rounded-lg text-center' onChange={handleChange}>
                    <option value="work">work</option>
                    <option value="personel">personel</option>
                    <option value="errands">errands</option>
                </select>

                <select name="status" id="" className='m-1 rounded-lg text-center' onChange={handleChange}>
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

export default Create
