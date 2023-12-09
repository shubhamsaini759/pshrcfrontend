import React, { useEffect, useState } from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import {  useMutation, useQuery } from 'react-query'
import { notifications, updateNotification } from '../../../utills/api/user'
import { useNavigate } from 'react-router-dom'
import { DateFormatter, TimeFormatter } from '../../../utills/helpers/DateFormatter'

const UserNotification = ({setFlag}) => {

  const[id,setId] = useState('')
  const { data } = useQuery('notifications',notifications.bind(this,localStorage.getItem('userId')))
  const { mutateAsync : updatedNoti } = useMutation('updateNotification',updateNotification)


  const navigate = useNavigate();

  const clickHandler = async(fileNum,attributeName) =>{
    const data = {fileNum,attributeName}
    await updatedNoti(data)
    .then((res)=>{
      navigate('/editcase',{ state : fileNum })
      setFlag(false)
    })
    .catch((err)=>{
      console.log(err)
    })
  }

  useEffect(()=>{
    setId(localStorage.getItem('userId'))
  },[])

  return (
    <div className='bg-white flex border-2 justify-center overflow-y-scroll fixed h-full mt-2 ' >
      <div id="toast-message-cta" className="w-full max-w-xs p-4 text-gray-500 bg-transparent  dark:bg-gray-800 dark:text-gray-400" >

        {
          data?.length !== 0 ?

          data?.map((x)=>(
            <div key={x._id} >
             
              <div className={`flex flex-row py-4 px-3 cursor-pointer ${x?.isOpen === false ? 'bg-slate-200'  : 'bg-slate-50' } `} onClick={()=>clickHandler(x?.fileNum,x?.attributeName)} >
                  <div className="flex flex-col ml-3 text-sm font-normal">
                    <div className='flex justify-between gap-6 ' >
                      <p className="mb-1 text-sm font-semibold text-gray-900 dark:text-white">{DateFormatter(x?.date)} </p>
                      <div className="mb-2 text-sm font-normal">{TimeFormatter(x?.date)} </div> 
                    </div>
                      
                      {/* <p className="mb-1 text-sm font-semibold text-gray-900 dark:text-white"> {x?.fileNum} is Rejected </p> */}
                      <div className="mb-2 text-sm font-normal">{x?.fileNum} is Rejected </div> 

                      <div className="mb-2 text-sm font-normal">{x?.message.slice(0,30)}</div> 
                  </div>
                </div>
                <div className="mx-auto mb-8 h-px w-48 bg-indigo-500/10"></div>
              </div>
          ))

            :
            <div className={`flex flex-row py-4 cursor-pointer bg-slate-200`}  >
                  <div className="flex flex-col w-full ml-3 text-sm font-normal">
                    <p  >No Updates</p>
                    </div>
                <div className="mx-auto mb-8 h-px w-48 bg-indigo-500/10"></div>
              </div>

        }
      </div>
    </div>
  )
}

export default UserNotification