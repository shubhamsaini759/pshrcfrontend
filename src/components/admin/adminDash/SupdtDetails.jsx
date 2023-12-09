import React from 'react'
import { useQuery } from 'react-query'
import { userdetails } from '../../../utills/api/adminDash'
import { useLocation } from 'react-router-dom'

const SupdtDetails = () => {

    const {state} = useLocation();
    const {data} = useQuery('userdetails',userdetails.bind(this,state))

  return (
    <>
        <div className='bg-blue-950 w-4/5 p-6 px-6 flex items-center justify-center cursor-pointer ' > 
            <p className='text-white font-bold text-xl' >Supdt. Details</p>
        </div>
        <div className="text-gray-700 pt-10 ">
            <div className=" gap-4 text-lg">
                <div className="grid grid-cols-2">
                    <div className="px-4 py-2 font-semibold">Name</div>
                    <div className="px-4 py-2">{data?.name}</div>
                </div>
                <div className="grid grid-cols-2">
                    <div className="px-4 py-2 font-semibold">Email</div>
                    <div className="px-4 py-2">{data?.email}</div>
                </div>
                <div className="grid grid-cols-2">
                    <div className="px-4 py-2 font-semibold">Contact no.</div>
                    <div className="px-4 py-2">{data?.phone}</div>
                </div>
                <div className="grid grid-cols-2">
                    <div className="px-4 py-2 font-semibold">Jail Address</div>
                    <div className="px-4 py-2">{data?.jailAddress}</div>
                </div>
                <div className="grid grid-cols-2">
                    <div className="px-4 py-2 font-semibold">Pincode</div>
                    <div className="px-4 py-2">{data?.pincode}</div>
                </div>
            </div>
        </div>
    </>
  )
}

export default SupdtDetails