import React from 'react'
import { useLocation } from 'react-router-dom';

const CheckEmail = () => {
    const location = useLocation();
    const email = location.state?.email || "your email";
  return (
    <div className="h-[calc(100vh-60px)] w-full flex items-center justify-center">
        <div className="h-80 w-180 bg-gray-200 rounded-lg shadow-md flex flex-col items-center justify-center gap-5">   
            <h1 className="text-2xl font-bold text-primary">Check Your Email</h1>
            <p className="text-center text-gray-700">We've sent you a magic link to {email}. Please check your inbox and click the link to log in.</p>
        </div>
    </div>
  )
}

export default CheckEmail