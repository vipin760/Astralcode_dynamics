import { useState } from 'react'
import { BrowserRouter, Routes,Route } from 'react-router-dom'
import UserRouter from './components/index'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {
  return (
    <>
      <BrowserRouter>
      <ToastContainer />
      <Routes>
        <Route path={'/*'} element={<UserRouter/>}/>
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App