import React, { useEffect, useRef, useState } from 'react'
import { AiOutlineUserAdd,AiFillEye, AiFillEdit,AiFillDelete } from "react-icons/ai";
import { useMutation, useQuery } from 'react-query';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { deleteuser, userlist } from '../../../utills/api/adminDash';
import { flexRender, getCoreRowModel, getPaginationRowModel, useReactTable } from '@tanstack/react-table';
import { filtered } from '../../../utills/api/user';

const SupdtList = () => {
    const navigate = useNavigate();

    const [data, setData] = useState([]);

    const {refetch : users } = useQuery('userlist',userlist,{ onSuccess : (x)=> setData(x) })
    const {mutateAsync : userId } = useMutation('deleteuser',deleteuser)
    const { mutateAsync : searching } = useMutation('filtered',filtered,{ onSuccess : (x)=> setData(x) })

    const [ isOpen, setIsOpen ] = useState(false)

    const savedId = useRef(null);


    const [name, setName] = useState('');


    const columns = [
        
        {
            accessorKey : "name",
            header : "name"
        },
        {
            accessorKey : "email",
            header : "Email"
        },
        {
            accessorKey : "phone",
            header : "Contact no."
        },
        {
            accessorKey : "jailAddress",
            header : "Jail Address"
        },
        {
            accessorFn : "",
            header : "Action",
            cell : (data) =><>
                                <td className="px-6 py-4 flex gap-4 ">
                                    <AiFillEye className='text-xl cursor-pointer text-black ' onClick={()=>navigate('/supdtdetails',{state : data.row.original._id})} />
                                    {/* <AiFillEdit className='text-xl cursor-pointer text-black ' onClick={()=>navigate('/caseedit') } /> */}
                                    <AiFillDelete className='text-xl cursor-pointer text-black ' onClick={deleteClick.bind(this,data.row.original._id)} />
                                </td>
                            </>
        },

    ]

    const table = useReactTable({
        columns, 
        data : data,
        getCoreRowModel : getCoreRowModel(),
        getPaginationRowModel : getPaginationRowModel()

    })

    const deleteClick = (uid) =>{
        savedId.current = uid;
        setIsOpen(true)
    }
    const deleteHandler = async() =>{
        const uid = savedId.current;

        await userId(uid)
        .then((res)=>{
            users()
            setIsOpen(false)
        })
        .catch((err)=>{
            console.log(err)
        })
    }

 


    const submitHandler = async() =>{
         await searching({name })
    }


    useEffect(()=>{
        if(name.length === 0){
            users()
        }
    },[name])
    
    if(!data){
        return null
    }



  return (
    <>
         <div className='bg-blue-950 w-4/5 p-6 px-6 flex items-center justify-center cursor-pointer ' > 
            <p className='text-white font-bold text-xl' >Supdt. List</p>
        </div>

        <div className="grid grid-cols-1 gap-6 mt-16 md:grid-cols-1 md:w-2/3">
            <div>
                <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">Full Name</label>
                <input type="text" onChange={(e)=>setName(e.target.value)} placeholder="John Deo" className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
            </div>
            {/* <div>
                <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">Email address</label>
                <input type="email"  placeholder="johnsnow@example.com" className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
            </div> */}
            <div className='flex justify-end' >
            <button
            onClick={submitHandler}
                className="flex items-center justify-between w-24 px-6 py-3 text-sm tracking-wide text-white capitalize transition-colors duration-300 transdiv bg-blue-500 rounded-md hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50">
                <span>Search </span>
            </button>
            </div>
        </div>

        <div className="pt-16 w-full px-4 overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 ">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        {
                            table.getHeaderGroups().map((item,index)=>(
                                <tr key={index} >
                                    {
                                        item.headers.map((subItem)=>(
                                            <th scope="col" className="px-6 py-3" key={subItem.id} >
                                            {
                                                flexRender(
                                                    subItem.column.columnDef.header,
                                                    subItem.getContext()
                                                )
                                            }
                                            </th>
                                        ))
                                    }
                            </tr>
                            ))
                        }
                       
                    </thead>
                    <tbody>
                        {
                            table.getRowModel().rows.map((item,index)=>
                                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={index}  >
                                    {
                                        item.getVisibleCells().map((subItem)=>(
                                            <td scope='row' className="px-6 py-4" key={subItem.id} >
                                                {
                                                    flexRender(
                                                        subItem.column.columnDef.cell,
                                                        subItem.getContext()
                                                    )
                                                }
                                            </td>
                                        ))
                                    }
                                </tr>
                            )
                        }

                       
                    </tbody>
                </table>
            </div>

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
                            <h3 className="mb-5 text-lg font-normal text-black dark:text-gray-400">Are you sure you want to <span className='font-bold' >Delete</span> this Supdt.?</h3>
                         
                            <button data-modal-hide="popup-modal" onClick={deleteHandler} type="button" className="text-white bg-blue-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2">
                                Yes, I'm sure
                            </button>
                            <button data-modal-hide="popup-modal"  type="button" className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">No, cancel</button>
                        </div>
                    </div>
                </div>
            </div>
            </>
            :
            null
        }

            <div className='w-full' >
                <div className="flex pt-8 justify-end pr-8 gap-4 ">
                    <button onClick={()=>table.setPageIndex(0)} className="flex items-center justify-center px-3 h-8 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                        first page
                    </button>
                    <button disabled={!table.getCanPreviousPage()} onClick={table.previousPage} className="flex items-center justify-center px-3 h-8 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                        Previous
                    </button>

                    <button disabled={!table.getCanNextPage()} onClick={table.nextPage} className="flex items-center justify-center px-3 h-8 ml-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                        Next
                    </button>
                    <button onClick={()=>table.setPageIndex(table.getPageCount()-1)} className="flex items-center justify-center px-3 h-8 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                        last page
                    </button>
                </div>
                <div className="flex py-4 justify-end pr-10 text-sm text-gray-700 dark:text-gray-400">
                    <p className='' >page <span className='font-bold' >{table.getState().pagination.pageIndex+1}</span> of <span className='font-bold' >{table.getPageCount()}</span></p>
                </div>
            </div>
    </>
  )
}

export default SupdtList