import React, { useState } from 'react'
import { AiFillDelete } from "react-icons/ai";


const DeletePop = () => {
    const [ isOpen, setIsOpen ] = useState(false)
  return (
    <div>
        <AiFillDelete className='text-xl cursor-pointer text-black ' onClick={()=>setIsOpen(true)} />

        {
        isOpen ? 
        <>
            <div className="justify-center bg-black bg-opacity-40 items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none p-5" >         
                <div className="relative w-full max-w-md max-h-full ">
                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                       <button type="button" onClick={()=>setIsOpen(false)} className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="popup-modal">
                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor"  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                            </svg>
                            <span className="sr-only">Close modal</span>
                        </button>
                        <div className="p-6 text-center pt-10 ">
                            <h3 className="mb-5 text-lg font-normal text-black dark:text-gray-400">Are you sure you want to delete this product?</h3>
                         
                            <button data-modal-hide="popup-modal" type="button" className="text-white bg-blue-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2">
                                Yes, I'm sure
                            </button>
                            <button data-modal-hide="popup-modal" onClick={()=>setIsOpen(false)} type="button" className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">No, cancel</button>
                        </div>
                    </div>
                </div>
            </div>
            </>
            :
            null
        }
    </div>
  )
}

export default DeletePop