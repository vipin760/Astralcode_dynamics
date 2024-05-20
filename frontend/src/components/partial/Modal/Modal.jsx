import React, { Component, useEffect, useState } from 'react';
import './Modal.css'

const Modal = ({data}) => {

  return (
    <div className={`fixed inset-0 flex justify-center items-center z-50 bg-black bg-opacity-50 overflow-scroll`}>
    <div className="bg-blue-100 rounded-lg shadow-lg p-6 m-4 overflow-y-auto max-h-full">
        <div className="flex justify-center items-center flex-col">
            <h1 className="text-2xl font-bold top-0">{data.title}</h1>
            <p className='text-md mt-5'>{data.description}</p>
        </div>
    </div>
</div>

  )
}

export default Modal
