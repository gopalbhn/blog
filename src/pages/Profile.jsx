import Button from '@/components/ui/button'
import { FlowButton } from '@/components/ui/flow-button'
import useUserStore from '@/store/userStore'

import { Pen, UserRoundIcon } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const Profile = () => {
  const navigate = useNavigate()
  const [openModel, setOpenModel] = useState(false)
  const user = useUserStore(state => state.user)
  const [requestStatus, setRequestStatus] = useState("")
  useEffect(() => {

    getAuthorRequestStatus()
  }, [])
  async function getAuthorRequestStatus() {
    const res = await fetch(`${import.meta.env.VITE_BACKEND_URI}/api/author/author-request`, {
      method: "GET",
      credentials: 'include'
    })
    const data = await res.json()
    if (data.success) {
      setRequestStatus(data.authorRequest?.status)
    }
  }



  async function handleContinue() {
    const res = await fetch(`${import.meta.env.VITE_BACKEND_URI}/api/author/author-request`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: 'include'
    })
    const data = await res.json()
    if (data.success) {
      toast.success(data.message)
      setOpenModel(false)
      setTimeout(() => {
        window.location.reload();
      }, 500)
    } else {
      toast.error(data.message)
    }
  }
  function handleClose() {
    setOpenModel(false)
  }

  async function handleCancelRequest() {
    const res = await fetch(`${import.meta.env.VITE_BACKEND_URI}/api/author/cancel-request`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: 'include'
    })
    const data = await res.json()
    if (data.success) {
      toast.success(data.message)
      setRequestStatus("")
      setOpenModel(false)
      setTimeout(() => {
        window.location.reload();
      }, 500)
    } else {
      toast.error(data.message)
    }
  }
  return (
    <div className='h-full w-full px-10'>
      <h1 className='mt-10 text-2xl font-bold text-gray-900 text-center'>Welcome To Your Profile</h1>
      <div className='h-full max-w-3xl mt-5 mx-auto rounded-xl p-4 shadow-sm '>
        <div className='h-full w-full flex items-center justify-between'>
          <div>

            <div className='h-full w-full flex items-center gap-3 '>

              <div className='h-20 w-20  rounded-full bg-primary flex items-center justify-center'>
                <UserRoundIcon className=' text-white text-5xl' />

              </div>
              <div className='flex flex-col'>
                <p className='text-lg font-semibold text-gray-900'>{user?.name}</p>
                <p className='text-sm text-gray-500'>{user?.email}</p>
                <p className='text-sm text-gray-500'>{user?.role}</p>
              </div>
            </div>
          </div>
          <div className='flex-col items-center gap-2'>
            {requestStatus === "pending" ? (
              <>
                <p>Your Author Request is still pending</p>
                <p>Do You Want to Cancel Request?</p>
                <FlowButton variant='default' className={'mx-auto w-50'} height={40} width={150} text={"Cancel Request"} onClick={() => handleCancelRequest()}> </FlowButton>
              </>
            ) : (
              <>
                <p className='text-small mb-2'>Request For Author Permission</p>
                <FlowButton variant='default' className={'mx-auto w-50'} height={40} width={150} text={"Author Permission"} onClick={() => setOpenModel(true)}> </FlowButton>
              </>

            )}
          </div>


        </div>
        <div className='h-full w-full  mt-5 rounded-xl p-4 flex flex-col items-center gap-4  '>
          <div className='w-full flex items-center justify-between  py-1 '>
            <p>First Name: {user?.name.split(" ")[0]}</p>

          </div>
          <div className=' w-full flex items-center justify-between py-1 '>
            <p>Last Name: {user?.name.split(" ")[1]}</p>

          </div>
          <div className=' w-full flex items-center justify-between py-1 '>
            <p>Email: {user?.email}</p>

          </div>
        </div>
      </div>
      {
        openModel && (
          <ConfirmModel onClose={handleClose} onConfirm={handleContinue} />

        )
      }
    </div >
  )
}

const ConfirmModel = ({ onClose, onConfirm }) => {

  return (
    <div className='fixed inset-0 z-10 flex items-center justify-center bg-black/60'>
      <div className='h-fit w-fit bg-white rounded-lg p-8 shadow-lg flex flex-col items-center justify-between gap-10'>

        <p>Are you sure you want to request for author permission?</p>
        <div className='flex items-center justify-between mt-4 gap-10'>
          <button className='rounded-lg py-2 px-4 border border-primary  text-primary' onClick={onClose}>Cancel</button>
          <button className='rounded-lg py-2 px-4 bg-primary text-white' onClick={onConfirm} >Continue</button>
        </div>
      </div>
    </div>
  )
}
export default Profile