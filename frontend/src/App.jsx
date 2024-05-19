import { useState, lazy, Suspense } from 'react'
import { BrowserRouter, Routes,Route } from 'react-router-dom'
import UserRouter from './components/index'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {PrivateRoute, PublicRoute} from './guards/PrivateRoute';
import Loading from './components/partial/Loading/Loading';
const Login = lazy(()=>import('../src/components/pages/Login/Login'));
const Register = lazy(()=>import('../src/components/pages/Register/Register'));
function App() {
  return (
    <>
    <Suspense fallback={<div>{<Loading/>}</div>}>
     <BrowserRouter>
      <ToastContainer />
      <Routes>
        <Route element={<PublicRoute/>}>
        <Route path='/login' element={<Login/>} />
        <Route path='/register' element={<Register/>} />
        </Route>
    
        <Route element={<PrivateRoute/>}>
        <Route path={'/*'} element={<UserRouter/>}/>
        </Route>
      </Routes>
      </BrowserRouter>
      </Suspense>
     
    </>
  )
}

export default App