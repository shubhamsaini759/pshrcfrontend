import React, { useState } from 'react'
import { FaBars } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

const AdminNav = () => {

  const [isOpen, setIsOpen] = useState(false)
  const navigate = useNavigate();

  const supHandler = () =>{
    navigate('/supdtlist');
    setIsOpen(false)
  }

  const logoutHandler = () =>{
    localStorage.removeItem('token')
    navigate('/');
  }

  return (
    <div className=' flex justify-between items-center w-screen bg-blue-950 fixed z-10 ' >
        <h1 className=' text-white p-6 font-bold text-sm md:text-base px-auto md:pl-24  ' onClick={()=>navigate('/dashboard')} >
          PUNJAB STATE HUMAN RIGHT COMMISSION
        </h1>
        <div>
          <FaBars className='relative text-white w-36 h-7 md:mr-24 md:pl-28 cursor-pointer ' onClick={()=>setIsOpen(x => !x)} />
          {
            isOpen ? 
              <div  className="z-10   absolute bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600">
                  <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" >
                    <li>
                      <a href="#" onClick={supHandler} className="block px-4 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">All Supdt.</a>
                    </li>
                  </ul>
                  <div className="py-2">
                    <p onClick={logoutHandler}  className="block px-4 py-2 cursor-pointer text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Log Out</p>
                  </div>
              </div>
              :
              null
          }
        </div>
    </div>
  )
}

export default AdminNav