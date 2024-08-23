import { message } from 'antd'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const Footer = () => {
  const navigate = useNavigate()
  const handleClick = () =>{   
     if(localStorage.getItem("auth-token")){
      localStorage.removeItem("auth-token")
      message.success("You are Logged Out")
      navigate("/admin/login")    
     } 
     else{
      message.error("Logout Failed")
     }
  }
  return (
    <div className=' h-20 w-1/3 items-center justify-center flex '>
      <button onClick={handleClick} className='text-white my-10 px-4 py-2 font-semibold bg-red-500  rounded-none'>LOGOUT</button>
    </div>
  )
}

export default Footer
