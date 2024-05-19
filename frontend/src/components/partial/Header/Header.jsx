import React, { useEffect, useState } from 'react'
import './Header.css'

const Header = () => {
const [Clicked,setClicked] = useState(false);
const handleShow =()=>{
    setClicked(!Clicked)
}
const [ IsToken,setIsToken]=useState(false)
useEffect(()=>{
    const token = localStorage.getItem('token')
    if(token){
        setIsToken(true)
    }
})
const handleLogout=()=>{
    localStorage.removeItem('token')
     window.location.href='/login'
    setIsToken(false)
}
  return (
    <div>
       <nav className="fixed w-full sm:p-5 p-3 md:p-1 shadow md:flex bg-violet-950 md:items-center md:justify-between text-white">
       <div className="flex justify-between bg-violet-950">
       <span className="text-3xl font-[popins] bg-violet-950">
            <img className="h-10 inline" src="/stocks/vecteezy_wolf-face-logo-mascot-illustration-with-ai-generative_24856242.png" alt="" />
            Tailwindcss
        </span>
        <span className="lg:hidden bg-violet-950">
            <i id="toggle-btn" className={`md:hidden bg-transparent ${Clicked?"fa-solid fa-times":"fa-solid fa-bars"}`} onClick={handleShow} ></i>
        </span>
       </div>
       {/* <ul className={`navbar bg-sky-900 mt-4 md:flex md:items-center z-[1000] md:z-auto md:static absolute w-full left-0 md:w-auto md:py-0 py-4 md:pl-0 pl-7 md:opacity-100 md:bg-transparent transition-all duration-500 ${Clicked?"opacity-100":"opacity-0"}`}>
     */}
            <ul className={`navbar bg-sky-900 md:flex md:items-center z-[1000] md:z-auto md:static absolute w-full left-0 md:w-auto md:py-0 py-4 md:pl-0 pl-7 md:opacity-100 md:bg-transparent transition-all duration-500 ${Clicked?"":"hidden"}`}>
        <li className="mx-4 my-6 md:my-0 text-center bg-transparent">
            <a href="/home" className="text-xl hover:text-cyan-400 duration-500 bg-transparent">Home</a> 
        </li>
        <li className="mx-4 my-6 md:my-0 text-center bg-transparent">
            <a href="#" className="text-xl hover:text-cyan-400 duration-500 bg-transparent">About</a> 
        </li>
        <li className="mx-4 my-6 md:my-0 text-center bg-transparent">
            <a href="#" className="text-xl hover:text-cyan-400 duration-500 bg-transparent">Service</a> 
        </li>
        <li className="mx-4 my-6 md:my-0 text-center bg-transparent">
            <a href="#" className="text-xl hover:text-cyan-400 duration-500 bg-transparent">Contact</a> 
        </li>
       <li className="flex justify-center bg-transparent">
        {
            IsToken?(<>
                    <button className="bg-cyan-500 text-white md:text-black md:bg-white mx-3 my-5 rounded hover:bg-cyan-700 p-2 font-[popins]" onClick={handleLogout} >
            Logout
        </button>
            </>):(<>
                <a href='/login' className="bg-cyan-500 text-white md:text-black md:bg-white mx-3 my-5 rounded hover:bg-cyan-700 p-2 font-[popins]">
            Login
        </a >
            </>)
        }

       </li>
       
    </ul>
       </nav>
    </div>
  )
}

export default Header
