import React, { useState } from 'react'
import { AiOutlineUserAdd,AiFillEye, AiFillEdit,AiFillDelete } from "react-icons/ai";
import { useMutation, useQuery } from 'react-query';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { casesList } from '../../../utills/api/adminDash';
import { flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, useReactTable } from '@tanstack/react-table';
import { DateTime } from 'luxon';
import { filterCase } from '../../../utills/api/user';


const AdminDash = () => {

    const [data, setData] = useState([])
    const { isFetching : dataFetch } = useQuery('casesList',casesList,{onSuccess : (x) =>setData(x) })

    const { mutateAsync : searching  } = useMutation('filterCase',filterCase,{onSuccess : (x) =>setData(x) })
    const navigate = useNavigate();

    const [ search, setSearch ] = useSearchParams();


    const columns = [
        
        {
            accessorKey : "fileNum",
            header : "FILE NO."
        },
        {
            accessorKey : "deceasedName",
            header : "NAME OF PERSON"
        },
        {
            accessorKey : "incidentDate",
            header : "INCIDENT DATE",
            cell : info => DateTime.fromISO(info.getValue()).toLocaleString(DateTime.DATE_MED)

        },
        {
            accessorKey : "incidentPlace",
            header : "INCIDENT PLACE"
        },
       
        {
            accessorFn : "",
            header : "ACTION",
            cell : (data) =><>
                            <td className="px-6 py-4 flex gap-4 ">
                                <AiFillEye className='text-xl cursor-pointer text-black ' onClick={()=>navigate('/casedetails',{state : data?.row?._valuesCache?.fileNum})} />
                                <AiFillEdit className='text-xl cursor-pointer text-black ' onClick={()=>navigate('/caseedit',{state : data?.row?._valuesCache?.fileNum}) } />
                                {/* <AiFillDelete className='text-xl cursor-pointer text-black ' /> */}
                            </td>
                         </>
        }

    ]


    const table = useReactTable({
        columns,
        data : data || [],
        getCoreRowModel : getCoreRowModel(), 
        getPaginationRowModel : getPaginationRowModel(), 
    })

    if(!data){
        return null
    }

    const submitHandler = async() =>{
        await searching(search)
    }

  return (
    <>
      <div className='bg-blue-950 w-4/5 p-6 px-6 flex items-center justify-between cursor-pointer ' > 
          <p className='text-white font-bold text-xl' >Create Supdt.'s Profile</p>
          <AiOutlineUserAdd className='text-white text-3xl text-bold' onClick={()=>navigate('/createsup')} />
      </div>

      <div className='pt-8' >
        <h1 className="text-3xl font-semibold text-gray-800 capitalize lg:text-4xl dark:text-white">death Cases</h1>
      </div>
      <div  className="grid grid-cols-1 gap-6 mt-8 md:grid-cols-2">
                  <div>
                      <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">File no.</label>
                      <input type="text" placeholder="123456" onChange={(e)=>setSearch({ fileNum : e.target.value })} className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
                  </div>

                  <div>
                      <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">Name of Person</label>
                      <input type="text" placeholder="John Deo" onChange={(e)=>setSearch({ deceasedName  : e.target.value })} className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
                  </div>

                  <div>
                      <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">Incident Place</label>
                      <input type="email" placeholder="canada" onChange={(e)=>setSearch({ incidentPlace : e.target.value })} className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
                  </div>
                  <div></div>
                  <div></div>
                
                  <button
                  onClick={submitHandler}
                      className="flex items-center justify-between w-full px-6 py-3 text-sm tracking-wide text-white capitalize transition-colors duration-300 transdiv  bg-blue-500 rounded-md hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50">
                      <span>Search </span>
                  </button>
              </div>

        <div className=" pt-12 w-full px-4 overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 ">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        {table.getHeaderGroups().map((item, index)=>(
                            <tr key={index} >
                                {item.headers.map((subItem)=>(
                                    <th scope="col" className="px-6 py-3" key={subItem.id} >
                                        {flexRender(
                                            subItem.column.columnDef.header,
                                            subItem.getContext()
                                        )}
                                    </th>
                                ))}
                            </tr>
                        ))}
                       
                    </thead>
                    <tbody>
                        {
                            table.getRowModel().rows.map((item)=>(
                                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={item.id}  >
                                    {item.getVisibleCells().map((subItem)=>(
                                        <td scope="row" key={subItem.id} className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            {flexRender(
                                                subItem.column.columnDef.cell,
                                                subItem.getContext()
                                            )}
                                        </td>
                                    ))}
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
            
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
                {
                    dataFetch ? 
                    <div role="status" className="absolute -translate-x-1/2 -translate-y-1/2 top-2/4 left-1/2 z-10 ">
                        <svg aria-hidden="true" className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/></svg>
                        <span className="sr-only">Loading...</span>
                    </div>
                    :
                    null
                }
            </div>
    </>
  )
}

export default AdminDash