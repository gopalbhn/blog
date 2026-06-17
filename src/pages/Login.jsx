import React from 'react'
import LoginImage from '../assets/login_image.png'
import LoginComponent from '@/components/login-3'
const Login = () => {
  return (
    <div className="h-[calc(100vh-60px)] w-full grid grid-cols-2 ">
      <div className="flex items-center justify-center ">
        <LoginComponent />
      </div>
      <div className='h-[calc(100vh-90px)] flex items-center '>
        <img src={LoginImage} alt="Login" className="w-full h-full object-cover mt-10" />
      </div>
    </div>
  )
}

export default Login