import React, { lazy } from 'react'
import { Route, Routes } from 'react-router-dom'

const Login = lazy(()=>import('./pages/Login/Login'));
const Register = lazy(()=>import('./pages/Register/Register'));
const Home = lazy(()=>import('./pages/Home/Home'))
const Error = lazy(()=>import('./pages/Error/Error'))

const index = () => {
  return (
    <div>
        <Routes>
            <Route path='/login' element={<Login/>} />
            <Route path='/register' element={<Register/>} />
            <Route path='/home' element={<Home/>} />
            <Route path='*' element={<Error/>} />
        </Routes>
    </div>
  )
}
export default index
