import React, { lazy } from 'react'
import { Route, Routes } from 'react-router-dom'
import Header from './partial/Header/Header'
import Footer from './partial/Footer/Footer'

const Home = lazy(()=>import('./pages/Home/Home'))
const Create= lazy(()=>import('./pages/Create/Create'))
const Error = lazy(()=>import('./pages/Error/Error'))
const Edit = lazy(()=>import('./pages/Edit/Edit'))


const index = () => {
  return (
    <div>
      <Header />
      <Routes>
            <Route path='/home' element={<Home/>} />
            <Route path='/create' element={<Create/>} />
            <Route path='/edit/:id' element={<Edit/>} />
            <Route path='*' element={<Error/>} />
        </Routes>
        <Footer/>
        
    </div>
  )
}
export default index
