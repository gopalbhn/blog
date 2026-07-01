import Button from '@/components/ui/button'
import useUserStore from '@/store/userStore'
import { Pen, UserRoundIcon } from 'lucide-react'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Profile = () => {
  const navigate = useNavigate()
  const user = useUserStore(state => state.user)
  useEffect(() => {
    if (!user) {
      navigate("/login")
    }
  }, [])

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
            <p className='text-small mb-2'>Request For Author Permission</p>
            <Button variant='gradient' className={'mx-auto'} height={40} width={150} >
              Author Permission
            </Button>
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


    </div >
  )
}

export default Profile