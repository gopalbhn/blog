import Button from '@/components/ui/button';
import { Verified } from 'lucide-react';
import React, { useState } from 'react'
import { useLocation, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
const CheckEmail = () => {
  const location = useLocation();
  const email = location.state?.email;
  const source  = location.state?.source;
  const [disabled,setDisabled] = useState(false)
  async function handleClick() {
    setDisabled(true)
    const res = await fetch(
      `${import.meta.env.VITE_BACKEND_URI}/api/user/verification-email`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email }),
        credentials: "include"
      }
    );
    const data = await res.json();
    if (data.success) {
      toast.success("Verification email sent successfully");
    } else {
      toast.error("Unable to send verification email");
    }
  }

  return (
    <div className="h-[calc(100vh-60px)] w-full flex items-center justify-center">
      <div className="h-80 w-180 bg-gray-200 rounded-lg shadow-md flex flex-col items-center justify-center gap-5">
        {
          source  == "register" ? (

            <>
              <h1 className="text-title font-bold ">Check Your Email</h1>
              <p className="text-center text-gray-700">We've sent you a magic link to {email}. Please check your inbox and click the link to log in.</p>
            </>

          ) : (
            <>
              <h1 className="text-title font-bold ">Your Account Is Not Verified </h1>
              <div className='flex items-center justify-center'>
                <Button variant={disabled ? 'disabled' : 'gradient'} className={'rounded-xl'} height={60} width={250} onClick={handleClick} disabled={disabled}>
                  Send Verification Email
                </Button>
              </div>
            </>
          )
        }
      </div>
    </div>
  )
}

export default CheckEmail