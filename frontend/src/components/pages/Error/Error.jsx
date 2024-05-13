import React from 'react'

const Error = () => {
  return (
    <div className='min-h-screen flex items-center justify-center'>
      <div>
      <h1 className='text-6xl bold'>404</h1>
      <p className='mb-2'>url not defined</p>
      <a className='bg-blue-400 rounded px-4 p-2 mt-2 ml-3 text-white hover:bg-blue-900' href='/home'>home</a>
      </div>
    </div>
  )
}

export default Error
