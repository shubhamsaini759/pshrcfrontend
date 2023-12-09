import React, { useState } from 'react'
import { AiOutlineBell } from 'react-icons/ai';
import { FaBars } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom'
import UserNotification from './UserNotification';
import { useMutation } from 'react-query';
import { login } from '../../../utills/api/login';

const UserNav = () => {

  const [ isOpen, setIsOpen ] = useState(false)
  const [flag, setFlag] = useState(false)
  const navigate = useNavigate();


  const logoutHandler = () =>{
    localStorage.removeItem('token')
    localStorage.removeItem('userId')
    navigate('/')
  }

  return (
    <>
    <div className=' flex justify-between items-center w-full  bg-blue-950 fixed z-10 ' >
        <h1 className=' text-white p-6 font-bold text-sm md:text-base px-auto md:pl-24  ' onClick={()=>navigate('/home')} >
          PUNJAB STATE HUMAN RIGHT COMMISSION
        </h1>
        
        <div className='flex' >
          <AiOutlineBell className='relative text-white w-36 h-7 pl-28 cursor-pointer ' onClick={()=>setFlag(x => !x)} />

          <FaBars className='relative text-white w-36 h-7 md:mr-24  cursor-pointer ' onClick={()=>setIsOpen(x => !x)} />
          {
            isOpen ? 
              <div  className="z-10   absolute bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600">
                  <div className="py-2">
                    <p onClick={logoutHandler} className="block px-4 py-2 cursor-pointer text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Log Out</p>
                  </div>
              </div>
              :
              null
          }
        </div>
    </div>

          <div className='absolute right-0 top-16 z-10 w-72  ' >
            {
              flag ? <UserNotification  setFlag={setFlag} /> : null
            }
          </div>
    </>
    

  )
}

export default UserNav