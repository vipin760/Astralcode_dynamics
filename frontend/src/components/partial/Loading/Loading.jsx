import React from 'react'
import './Loading.css'
const Loading = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50">
    <div className="border-t-2 border-b-2 border-gray-900">
    <div className="loader"></div>
    </div>
  </div>
  
  )
}

export default Loading
