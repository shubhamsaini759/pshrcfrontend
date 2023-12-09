import React from 'react'
import { Outlet } from 'react-router-dom'
import AdminNav from '../../components/admin/adminNav'

const Admin = () => {


  return (
    <div>
      <AdminNav />
      <div className='pt-28 flex flex-col justify-center items-center ' > 
        <Outlet />
      </div>
    </div>
  )
}

export default Admin