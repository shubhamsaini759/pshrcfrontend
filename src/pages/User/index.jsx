import React from 'react'
import UserNav from '../../components/user/userNav'
import { Outlet } from 'react-router-dom'

const User = () => {
  return (
    <div>
        <UserNav />
      <div className='pt-28 flex flex-col justify-center items-center ' > 
        <Outlet />
      </div>
    </div>
  )
}

export default User