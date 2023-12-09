import React, { useEffect, useState } from 'react'
import { useMutation, useQuery } from 'react-query';
import { useLocation } from 'react-router-dom'
import { caseDetails } from '../../../utills/api/adminDash';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import { rejectedData } from '../../../utills/api/user';
import { DateFormatter } from '../../../utills/helpers/DateFormatter';



const CaseDetails = () => {
    const {state} = useLocation();

    const {data} = useQuery('caseDetails',caseDetails.bind(this,state))
 
    const [ isOpen, setIsOpen ] = useState(false)
    const { mutateAsync : rejected,data : rejectedInfo } = useMutation('rejectedData',rejectedData)

    const infoHandler = async(fileNum,attributeName)=>{
      const info ={
        attributeName,
        fileNum
      }
      await rejected(info)
      .then((res)=>{
        setIsOpen(true)
      })
    }

  


  return (
    <>
        <div className='bg-blue-950 w-4/5 p-6 px-6 flex items-center justify-center cursor-pointer ' > 
            <p className='text-white font-bold text-xl' >Case Details</p>
        </div>
        <div className="text-gray-700 pt-10 ">
            <div className="grid md:grid-cols-2 gap-4 text-lg">
                <div className="grid grid-cols-2">
                    <div className="px-4 py-2 font-semibold">File No.</div>
                    <div className="px-4 py-2">{data?.fileNum}</div>
                </div>
                <div className="grid grid-cols-2">
                    <div className="px-4 py-2 font-semibold">Full Name</div>
                    <div className="px-4 py-2">{data?.deceasedName}</div>
                </div>
                <div className="grid grid-cols-2">
                    <div className="px-4 py-2 font-semibold">Gender</div>
                    <div className="px-4 py-2">{data?.gender}</div>
                </div>
                <div className="grid grid-cols-2">
                    <div className="px-4 py-2 font-semibold">Incident Date</div>
                    <div className="px-4 py-2">{DateFormatter(data?.incidentDate)}</div>
                </div>
                <div className="grid grid-cols-2">
                    <div className="px-4 py-2 font-semibold">Incident Place</div>
                    <div className="px-4 py-2">{data?.incidentPlace}</div>
                </div>
                <div className="grid grid-cols-2">
                    <div className="px-4 py-2 font-semibold">Supdt. Jail Name</div>
                    <div className="px-4 py-2">{data?.user?.name}</div>
                </div>  
            </div>
        </div>
        <div className="pt-16 w-full px-4 overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 ">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Sr. no.
                            </th>
                            <th scope="col" className="px-6 py-3 ">
                                Duration
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Report
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Upload By
                            </th>
                            <th scope="col" className="px-6 py-3 ">
                               File
                            </th>
                            <th scope="col" className="px-6 py-3 ">
                               Upload Date
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Status
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"  >
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                              1.
                            </th>
                            <td className="px-6 py-4">
                              24 Hoursnul
                            </td>
                            <td className="px-6 py-4">
                             TPM
                            </td>
                            <td className="px-6 py-4">
                             Supdt. of Jail
                            </td>
                            <td className="px-6 py-4">
                              {
                              data?.tpm?.filePath ?
                                <a href={`http://127.0.0.1:4000/uploads/${data?.tpm?.filePath}`} >
                                  <button className='text-blue-800'>Download File</button>
                                </a>
                                :
                                null
                              }
                            </td>
                            <td className="px-6 py-4">
                              {DateFormatter(data?.tpm?.dateTime)}

                              
                              </td>
                            <td className="px-6 py-4 flex gap-3 items-center">
                              {data?.tpm?.status === 'pending' ? "" : <>{data?.tpm?.status  }
                              <AiOutlineInfoCircle onClick={infoHandler.bind(this,data?.fileNum,'tpm')} className='text-black cursor-pointer text-lg ' /></> }
                            </td>
                        </tr>
                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"  >
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                              2.
                            </th>
                            <td className="px-6 py-4">
                              After 7 days
                            </td>
                            <td className="px-6 py-4">
                             PMR
                            </td>
                            <td className="px-6 py-4">
                             Supdt. of Jail
                            </td>
                            <td className="px-6 py-4">
                              {
                              data?.pmr?.filePath ?
                                <a href={`http://127.0.0.1:4000/uploads/${data?.pmr?.filePath}`} >
                                  <button className='text-blue-800'>Download File</button>
                                </a>
                                :
                                null
                              }
                            </td>
                             <td className="px-6 py-4">
                              {DateFormatter(data?.pmr?.dateTime)}
                            </td>
                            <td className="px-6 py-4 flex gap-3 items-center">
                              {data?.pmr?.status  === 'pending' ? "" :<>{ data?.pmr?.status}
                              <AiOutlineInfoCircle onClick={infoHandler.bind(this,data?.fileNum,'pmr')} className='text-black cursor-pointer text-lg ' /></>}

                            </td>
                        </tr>
                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"  >
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                              3.
                            </th>
                            <td className="px-6 py-4">
                              After 7 days
                            </td>
                            <td className="px-6 py-4">
                             PPR
                            </td>
                            <td className="px-6 py-4">
                             Supdt. of Jail
                            </td>
                            <td className="px-6 py-4">
                            {
                              data?.ppr?.filePath ?
                                <a href={`http://127.0.0.1:4000/uploads/${data?.ppr?.filePath}`} >
                                  <button className='text-blue-800'>Download File</button>
                                </a>
                                :
                                null
                              }
                            </td>
                             <td className="px-6 py-4">
                              {DateFormatter(data?.ppr?.dateTime)}
                            </td>
                            <td className="px-6 py-4 flex gap-3 items-center">
                              {data?.ppr?.status  === 'pending' ? "" : <>{data?.ppr?.status}
                              <AiOutlineInfoCircle onClick={infoHandler.bind(this,data?.fileNum,'ppr')} className='text-black cursor-pointer text-lg ' /> </>}

                            </td>
                        </tr>
                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"  >
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                              4.
                            </th>
                            <td className="px-6 py-4">
                            After 7 days
                            </td>
                            <td className="px-6 py-4">
                             Medical History 
                            </td>
                            <td className="px-6 py-4">
                             Supdt. of Jail
                            </td>
                            <td className="px-6 py-4">
                            {
                              data?.medical?.filePath ?
                                <a href={`http://127.0.0.1:4000/uploads/${data?.medical?.filePath}`} >
                                  <button className='text-blue-800'>Download File</button>
                                </a>
                                :
                                null
                              }
                            </td>
                             <td className="px-6 py-4">
                              {DateFormatter(data?.medical?.dateTime)}
                            </td>
                            <td className="px-6 py-4 flex gap-3 items-center">
                              {data?.medical?.status  === 'pending' ? "" : <> {data?.medical?.status}
                              <AiOutlineInfoCircle onClick={infoHandler.bind(this,data?.fileNum,'medical')} className='text-black cursor-pointer text-lg ' /> </>}

                            </td>
                        </tr>
                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"  >
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                              5.
                            </th>
                            <td className="px-6 py-4">
                            After 7 days
                            </td>
                            <td className="px-6 py-4">
                             Receiiving and Dispatch from Lab
                            </td>
                            <td className="px-6 py-4">
                             Supdt. of Jail
                            </td>
                            <td className="px-6 py-4">
                            {
                              data?.receivingAndDispatch?.filePath ?
                                <a href={`http://127.0.0.1:4000/uploads/${data?.receivingAndDispatch?.filePath}`} >
                                  <button className='text-blue-800'>Download File</button>
                                </a>
                                :
                                null
                              }
                            </td>
                             <td className="px-6 py-4">
                              {DateFormatter(data?.receivingAndDispatch?.dateTime)}
                            </td>
                            <td className="px-6 py-4 flex gap-3 items-center">
                              {data?.receivingAndDispatch?.status  === 'pending' ? "" : <>{data?.receivingAndDispatch?.status}
                              <AiOutlineInfoCircle onClick={infoHandler.bind(this,data?.fileNum,'receivingAndDispatch')} className='text-black cursor-pointer text-lg ' /></>}

                            </td>
                        </tr>
                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"  >
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                              6.
                            </th>
                            <td className="px-6 py-4">
                            After 7 days
                            </td>
                            <td className="px-6 py-4">
                             Preliminary Inquest Report
                            </td>
                            <td className="px-6 py-4">
                             Supdt. of Jail
                            </td>
                            <td className="px-6 py-4">
                            {
                              data?.Preliminary?.filePath ?
                                <a href={`http://127.0.0.1:4000/uploads/${data?.Preliminary?.filePath}`} >
                                  <button className='text-blue-800'>Download File</button>
                                </a>
                                :
                                null
                              }
                            </td>
                             <td className="px-6 py-4">
                              {DateFormatter(data?.Preliminary?.dateTime)}
                            </td>
                            <td className="px-6 py-4 flex gap-3 items-center">
                              {data?.Preliminary?.status  === 'pending' ? "" : <>{data?.Preliminary?.status}
                              <AiOutlineInfoCircle onClick={infoHandler.bind(this,data?.fileNum,'Preliminary')} className='text-black cursor-pointer text-lg ' /> </>}

                            </td>
                        </tr>
                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"  >
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                              7.
                            </th>
                            <td className="px-6 py-4">
                            After 50 days
                            </td>
                            <td className="px-6 py-4">
                            Receiving Examination Report from Chemical Lab
                            </td>
                            <td className="px-6 py-4">
                             Supdt. of Jail
                            </td>
                            <td className="px-6 py-4">
                            {
                              data?.receivingDdr?.filePath ?
                                <a href={`http://127.0.0.1:4000/uploads/${data?.receivingDdr?.filePath}`} >
                                  <button className='text-blue-800'>Download File</button>
                                </a>
                                :
                                null
                              }
                            </td>
                             <td className="px-6 py-4">
                              {DateFormatter(data?.receivingDdr?.dateTime)}
                            </td>
                            <td className="px-6 py-4 flex gap-3 items-center">
                              {data?.receivingDdr?.status  === 'pending' ? "" :  <> {data?.receivingDdr?.status}
                              <AiOutlineInfoCircle onClick={infoHandler.bind(this,data?.fileNum,'receivingDdr')} className='text-black cursor-pointer text-lg ' /></> }

                            </td>
                        </tr>
                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"  >
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                              8.
                            </th>
                            <td className="px-6 py-4">
                            After 50 days
                            </td>
                            <td className="px-6 py-4">
                            Dispatch Examination Report from Chemical Lab
                            </td>
                            <td className="px-6 py-4">
                             Supdt. of Jail
                            </td>
                            <td className="px-6 py-4">
                            {
                              data?.dispatchDdr?.filePath ?
                                <a href={`http://127.0.0.1:4000/uploads/${data?.dispatchDdr?.filePath}`} >
                                  <button className='text-blue-800'>Download File</button>
                                </a>
                                :
                                null
                              }
                            </td>
                             <td className="px-6 py-4">
                              {DateFormatter(data?.dispatchDdr?.dateTime)}
                            </td>
                            <td className="px-6 py-4 flex gap-3 items-center">
                              {data?.dispatchDdr?.status  === 'pending' ? "" : <> {data?.dispatchDdr?.status}
                              <AiOutlineInfoCircle onClick={infoHandler.bind(this,data?.fileNum,'dispatchDdr')} className='text-black cursor-pointer text-lg ' /></> }

                            </td>
                        </tr>
                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"  >
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                              9.
                            </th>
                            <td className="px-6 py-4">
                            After 50 days
                            </td>
                            <td className="px-6 py-4">
                                Copy of Chemical Lab Report
                            </td>
                            <td className="px-6 py-4">
                             Supdt. of Jail
                            </td>
                            <td className="px-6 py-4">
                            {
                              data?.chemical?.filePath ?
                                <a href={`http://127.0.0.1:4000/uploads/${data?.chemical?.filePath}`} >
                                  <button className='text-blue-800'>Download File</button>
                                </a>
                                :
                                null
                              }
                            </td>
                             <td className="px-6 py-4">
                              {DateFormatter(data?.chemical?.dateTime)}
                            </td>
                            <td className="px-6 py-4">
                              {data?.chemical?.status  === 'pending' ? "" : <>{data?.chemical?.status }
                              <AiOutlineInfoCircle onClick={infoHandler.bind(this,data?.fileNum,'chemical')} className='text-black cursor-pointer text-lg ' /></> }

                            </td>
                        </tr>
                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"  >
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                              10.
                            </th>
                            <td className="px-6 py-4">
                            After 50 days
                            </td>
                            <td className="px-6 py-4">
                                Copy of Histopatholgy report
                            </td>
                            <td className="px-6 py-4">
                             Supdt. of Jail
                            </td>
                            <td className="px-6 py-4">
                            {
                              data?.histopathological?.filePath ?
                                <a href={`http://127.0.0.1:4000/uploads/${data?.histopathological?.filePath}`} >
                                  <button className='text-blue-800'>Download File</button>
                                </a>
                                :
                                null
                              }
                            </td>
                             <td className="px-6 py-4">
                              {DateFormatter(data?.histopathological?.dateTime)}
                            </td>
                            <td className="px-6 py-4 flex gap-3 items-center">
                              {data?.histopathological?.status  === 'pending' ? "" :<> {data?.histopathological?.status}
                              <AiOutlineInfoCircle onClick={infoHandler.bind(this,data?.fileNum,'histopathological')} className='text-black cursor-pointer text-lg ' /> </>}

                            </td>
                        </tr>
                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"  >
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                              11.
                            </th>
                            <td className="px-6 py-4">
                            After 50 days
                            </td>
                            <td className="px-6 py-4">
                                Report of Final Cause of death
                            </td>
                            <td className="px-6 py-4">
                             Supdt. of Jail
                            </td>
                            <td className="px-6 py-4">
                            {
                              data?.causeOfdDeath?.filePath ?
                                <a href={`http://127.0.0.1:4000/uploads/${data?.causeOfdDeath?.filePath}`} >
                                  <button className='text-blue-800'>Download File</button>
                                </a>
                                :
                                null
                              }
                            </td>
                             <td className="px-6 py-4">
                              {data?.causeOfdDeath?.dateTime}
                            </td>
                            <td className="px-6 py-4 flex gap-3 items-center">
                              {data?.causeOfdDeath?.status  === 'pending' ? "" :<> {data?.causeOfdDeath?.status}
                              <AiOutlineInfoCircle onClick={infoHandler.bind(this,data?.fileNum,'causeOfdDeath')} className='text-black cursor-pointer text-lg ' /> </>
                            }

                            </td>
                        </tr>
                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"  >
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                              12.
                            </th>
                            <td className="px-6 py-4">
                                3 months
                            </td>
                            <td className="px-6 py-4">
                            Final Inquest report
                            </td>
                            <td className="px-6 py-4">
                             Supdt. of Jail
                            </td>
                            <td className="px-6 py-4">
                            {
                              data?.Inquest?.filePath ?
                                <a href={`http://127.0.0.1:4000/uploads/${data?.Inquest?.filePath}`} >
                                  <button className='text-blue-800'>Download File</button>
                                </a>
                                :
                                null
                              }
                            </td>
                             <td className="px-6 py-4">
                              {DateFormatter(data?.Inquest?.dateTime)}
                            </td>
                            <td className="px-6 py-4">
                              {data?.Inquest?.status  === 'pending' ? "" : <>{data?.Inquest?.status }
                              <AiOutlineInfoCircle onClick={infoHandler.bind(this,data?.file,'Inquest')} className='text-black cursor-pointer text-lg ' /> </>}

                            </td>
                        </tr>
                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"  >
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                              13.
                            </th>
                            <td className="px-6 py-4">
                            
                            </td>
                            <td className="px-6 py-4">
                            Orders of PSHRC
                            </td>
                            <td className="px-6 py-4">
                             PSHRC
                            </td>
                            <td className="px-6 py-4">
                            {
                              data?.ordersOfPshrc?.filePath ?
                                <a href={`http://127.0.0.1:4000/uploads/${data?.ordersOfPshrc?.filePath}`} >
                                  <button className='text-blue-800'>Download File</button>
                                </a>
                                :
                                <input type="file" name='tpm' placeholder="Male" className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />

                              }
                            </td>
                             <td className="px-6 py-4">
                              {DateFormatter(data?.ordersOfPshrc?.dateTime)}
                            </td>
                            <td className="px-6 py-4">
                              {/* {data?.ordersOfPshrc?.status}s */}
                            </td>
                        </tr>
                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"  >
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                              14.
                            </th>
                            <td className="px-6 py-4">
                            
                            </td>
                            <td className="px-6 py-4">
                                Compilance report
                            </td>
                            <td className="px-6 py-4">
                             Supdt. of Jail
                            </td>
                            <td className="px-6 py-4">
                            {
                              data?.compilance?.filePath ?
                                <a href={`http://127.0.0.1:4000/uploads/${data?.compilance?.filePath}`} >
                                  <button className='text-blue-800'>Download File</button>
                                </a>
                                :
                                null
                              }
                            </td>
                             <td className="px-6 py-4">
                              {DateFormatter(data?.compilance?.dateTime)}
                            </td>
                            <td className="px-6 py-4 flex gap-3 items-center" >
                              {data?.compilance?.status  === 'pending' ? "" :<>{data?.compilance?.status}
                              <AiOutlineInfoCircle onClick={infoHandler.bind(this,data?.fileNum,'compilance' )} className='text-black cursor-pointer text-lg ' /> </>
                              }
                            </td>
                        </tr>
                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"  >
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                              15.
                            </th>
                            <td className="px-6 py-4">
                            
                            </td>
                            <td className="px-6 py-4">
                            Final Order
                            </td>
                            <td className="px-6 py-4">
                             PSHRC
                            </td>
                            <td className="px-6 py-4">
                              
                            {
                              data?.finalOrder?.filePath ?
                                <a href={`http://127.0.0.1:4000/uploads/${data?.finalOrder?.filePath}`} >
                                  <button className='text-blue-800'>Download File</button>
                                </a>
                                :
                                <input type="file" name='tpm' placeholder="Male" className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />

                              }


                            </td>
                             <td className="px-6 py-4">
                              {DateFormatter(data?.finalOrder?.dateTime)}
                            </td>
                            <td className="px-6 py-4">
                              {/* {data?.finalOrder?.status} */}
                            </td>
                        </tr>

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
                      <path stroke="currentColor"  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                    </svg>
                    <span className="sr-only">Close modal</span>
                  </button>
                  <div className="p-6 text-center pt-10 ">
                          {
                            Array.isArray(rejectedInfo) && rejectedInfo.length === 0  ?  
                          
                            <div className="text-gray-700 pt-10 ">
                               <h4 className="text-lg font-semibold tracking-tight text-blue-900">Approved</h4>
                              </div>
                              :
                              <ol role="list" className="mt-10 space-y-8 bg-white/60 px-10 overflow-y-auto text-left  shadow-blue-900/5 backdrop-blur">
                                { 
                                  rejectedInfo?.map((x)=>(
                                    <>
                                      <li >
                                          <h4 className="text-lg font-semibold tracking-tight text-blue-900">File Name : {x?.attributeName}</h4>
                                          <p className="mt-1 tracking-tight text-blue-900"><span className='text-lg font-semibold'> Status :</span>  {x?.status}</p>
                                          <p className="mt-1 tracking-tight text-blue-900"><span className='text-lg font-semibold' >Rejected Date :</span> {DateFormatter(x?.date)}</p>
                                          <p className="mt-1 tracking-tight text-blue-900"><span className='text-lg font-semibold'>Reason : </span>{x?.message}</p>

                                      </li>
                                      <div className="mx-auto mb-8 h-px w-48 bg-indigo-500/10"></div>

                                    </>
                                ))}
                              </ol>
                          }
                  </div>
                </div>
              </div>
            </div>
          </>
          :
          null
        }

         

    </>
  )
}

export default CaseDetails