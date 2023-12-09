import React, { useEffect, useState } from 'react'
import { useMutation, useQuery } from 'react-query'
import { caseDetails } from '../../../utills/api/adminDash'
import { useLocation } from 'react-router-dom'
import { AiFillDelete } from 'react-icons/ai'
import { deleteFile, updatedeceased } from '../../../utills/api/user'
import { DateFormatter } from '../../../utills/helpers/DateFormatter'
import { toast } from 'react-toastify'


const EditCase = () => {

  const { state } = useLocation();
  const [ isOpen, setIsOpen ] = useState();
  const { data, refetch : listFecth } = useQuery('caseDetails', caseDetails.bind(this, state),{ onSuccess : (x)=> {
    setDetails({
      deceasedName: x?.deceasedName,
      incidentDate: x?.incidentDate,
      incidentDetails: x?.incidentDetails,
      incidentPlace: x?.incidentPlace,
      gender: x?.gender,
      fileNum : state
    })
  } })


  console.log(state,'stater')
  console.log(data,'data')
  const { mutateAsync : updatedData } = useMutation('updatedeceased',updatedeceased)
  const { mutateAsync : deletedDetails } = useMutation('deleteFile',deleteFile)

  const [details, setDetails] = useState({
    fileNum : "",
    deceasedName: "",
    incidentDate: "",
    incidentDetails: "",
    incidentPlace: "",
    gender: "",
    // tpm : "",
    // pmr : "",
    // ppr : "",
    // medical : "",
    // receivingAndDispatch : "",
    // Preliminary : "",
    // receivingDdr : "",
    // dispatchDdr : "",
    // chemical : "",
    // histopathological : "",
    // causeOfdDeath : "",
    // Inquest : "",
    // compilance : ""
  })

  const [ deleted, setDeleted ] = useState({
    attributeName : "",
    fileNum : ""
  })
 
  

  const fileHandler = async(fileNum,e) =>{
    setDetails((old) => ({...old,[e.target.name] : e.target.files[0] }) )
    const formData = new FormData();
    formData.append([e.target.name],e.target.files[0])
    formData.append('fileNum',fileNum)

    await updatedData(formData)
    .then((res)=>{
      listFecth()
      toast.success("uploaded Successfully !", {
        position: toast.POSITION.TOP_RIGHT,
      });
    })
    .catch((err)=>{
      console.log(err)
    })
  }

  const changeHandler =(e)=>{
    setDetails((old) => ({...old,[e.target.name] : e.target.value}))
  }

  const submitHandler = async (e) =>{
    e.preventDefault()
    const { fileNum, deceasedName,incidentDate,incidentDetails,incidentPlace,gender} = details
    
    const formData = new FormData();
    formData.append('fileNum',fileNum)
    formData.append('deceasedName',deceasedName)
    formData.append('incidentDate',incidentDate)
    formData.append('incidentDetails',incidentDetails)
    formData.append('incidentPlace',incidentPlace)
    formData.append('gender',gender)

    await updatedData(details)
    .then((res)=>{
      listFecth()
      toast.success("updated Successfully !", {
        position: toast.POSITION.TOP_RIGHT,
      });
    
    })
    .catch((err)=>{
      console.log(err,'err')
    })
  }

  const deleteSelected = (fileNum,name) =>{
    setDeleted((old) => ({...old, fileNum, attributeName : name }))
    setIsOpen(true)
  }
  const deleteHandler = async() =>{
    await deletedDetails(deleted) 
    .then((res)=>{
      listFecth()
      setIsOpen(false)
    })
    .catch((err)=>{
      console.log(err)
    })
  }

  useEffect(() => {
    setDetails({
      deceasedName: data?.deceasedName,
      incidentDate: data?.incidentDate,
      incidentDetails: data?.incidentDetails,
      incidentPlace: data?.incidentPlace,
      gender: data?.gender,
      fileNum : state
    })
  }, [])

  return (
    <>
      <div className='bg-blue-950 w-4/5 p-6 px-6 flex items-center justify-center cursor-pointer ' >
        <p className='text-white font-bold text-xl' >Case Details</p>
      </div>
      {/* <form  encType='multipart/form-data' > */}
      <form className="text-gray-700 pt-10 px-4 " onSubmit={submitHandler} encType='multipart/form-data' >
        <div className="grid md:grid-cols-2 gap-4 text-lg">
          <div className="grid grid-cols-2">
            <div className="px-4 py-2 font-semibold">File No.</div>
            <div className="px-4 py-2">{state}</div>
          </div>
          <div className="grid grid-cols-2">
            <div className="px-4 py-2 font-semibold">Full Name</div>
            <input type="text" name='deceasedName' value={details.deceasedName} onChange={changeHandler} placeholder="John Deo" className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
          </div>
          <div className="grid grid-cols-2">
            <div className="px-4 py-2 font-semibold">Gender</div>
            <input type="text" name='gender' value={details.gender} onChange={changeHandler} placeholder="Gender" className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />

          </div>
          <div className="grid grid-cols-2">
            <div className="px-4 py-2 font-semibold">Incident Date</div>
            <input type="date" name='incidentDate' value={details.incidentDate} onChange={changeHandler} placeholder="" className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />

          </div>
          <div className="grid grid-cols-2">
            <div className="px-4 py-2 font-semibold">Incident Place</div>
            <input type="text" name='incidentPlace' value={details.incidentPlace} onChange={changeHandler} placeholder="canada" className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
          </div>
          <div></div>
          <div className="grid grid-cols-2">
            <div className="px-4 py-2 font-semibold">Incident Details</div>
            <textarea type="text" name='incidentDetails' value={details.incidentDetails} onChange={changeHandler} placeholder="canada" className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
          </div>
        </div>
        
          <div className='pt-8 pr-10 w-full flex justify-end items-end ' >
            <button
            type='submit'
              className="flex items-center justify-between w-24 px-6 py-3 text-sm tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-md hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50">
              <span>Submit </span>
            </button>
          </div>
      </form>



      <div className="relative pt-16 w-full px-4 overflow-x-auto shadow-md sm:rounded-lg">

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
                24 Hours
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
                    <div className='flex gap-3' >
                      <a href={`http://127.0.0.1:4000/uploads/${data?.tpm?.filePath}`} >
                        <button >Download File</button>
                      </a>
                      {
                        data?.tpm?.status !== 'approved' ?
                      <AiFillDelete className='text-xl cursor-pointer text-black ' onClick={deleteSelected.bind(this,details?.fileNum,"tpm")} />
                        : null
                      }
                    </div>

                    :
                    <input type="file" name='tpm' onChange={fileHandler.bind(this,data?.fileNum)} placeholder="Male" className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
                }

              </td>
              <td className="px-6 py-4">
                {DateFormatter(data?.tpm?.dateTime)}
              </td>
              <td className="px-6 py-4">
                {data?.tpm?.status === 'pending' ? "" : data?.tpm?.status}
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

                    <div className='flex gap-3' >
                      <a href={`http://127.0.0.1:4000/uploads/${data?.pmr?.filePath}`} >
                        <button>Download File</button>
                      </a>
                      {
                        data?.pmr?.status !== 'approved' ?
                        <AiFillDelete className='text-xl cursor-pointer text-black ' onClick={deleteSelected.bind(this,details?.fileNum,"pmr")} />
                        :
                        null
                      }
                    </div>

                    :
                    <input type="file" name='pmr' onChange={fileHandler.bind(this,data?.fileNum)} placeholder="Male" className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
                }
              </td>
              <td className="px-6 py-4">
                {DateFormatter(data?.pmr?.dateTime)}
              </td>
              <td className="px-6 py-4">
                {data?.pmr?.status === 'pending' ? "" : data?.pmr?.status}
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


                    <div className='flex gap-3' >
                      <a href={`http://127.0.0.1:4000/uploads/${data?.ppr?.filePath}`} >
                        <button>Download File</button>
                      </a>
                      {
                        data?.ppr?.status !== 'approved' ?
                        <AiFillDelete className='text-xl cursor-pointer text-black ' onClick={deleteSelected.bind(this,details?.fileNum,"ppr")} />
                        :
                        null
                      }
                    </div>

                    :
                    <input type="file" name='ppr' onChange={fileHandler.bind(this,data?.fileNum)} placeholder="Male" className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
                }
              </td>
              <td className="px-6 py-4">
                {DateFormatter(data?.ppr?.dateTime)}
              </td>
              <td className="px-6 py-4">
                {data?.ppr?.status === 'pending' ? "" :  data?.ppr?.status}
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

                    <div className='flex gap-3' >
                      <a href={`http://127.0.0.1:4000/uploads/${data?.medical?.filePath}`} >
                        <button>Download File</button>
                      </a>
                      {
                        data?.medical?.status !== 'approved' ?
                        <AiFillDelete className='text-xl cursor-pointer text-black ' onClick={deleteSelected.bind(this,details?.fileNum,"medical")} />
                        :
                        null
                      }
                    </div>

                    :
                    <input type="file" name='medical' onChange={fileHandler.bind(this,data?.fileNum)} placeholder="Male" className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
                }

              </td>
              <td className="px-6 py-4">
                {DateFormatter(data?.medical?.dateTime)}
              </td>
              <td className="px-6 py-4">
                {data?.medical?.status === 'pending' ? "" : data?.medical?.status}
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
                Receiving and Dispatch from Lab
              </td>
              <td className="px-6 py-4">
                Supdt. of Jail
              </td>
              <td className="px-6 py-4">
                {
                  data?.receivingAndDispatch?.filePath ?

                    <div className='flex gap-3' >
                      <a href={`http://127.0.0.1:4000/uploads/${data?.receivingAndDispatch?.filePath}`} >
                        <button>Download File</button>
                      </a>
                      {
                        data?.receivingAndDispatch?.status !== 'approved' ?
                        <AiFillDelete className='text-xl cursor-pointer text-black ' onClick={deleteSelected.bind(this,details?.fileNum,"receivingAndDispatch")} />
                        :
                        null
                      }
                    </div>

                    :
                    <input type="file" name='receivingAndDispatch' onChange={fileHandler.bind(this,data?.fileNum)}   placeholder="Male" className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
                }
              </td>
              <td className="px-6 py-4">
                {DateFormatter(data?.receivingAndDispatch?.dateTime)}
              </td>
              <td className="px-6 py-4">
                {data?.receivingAndDispatch?.status === 'pending' ? "" : data?.receivingAndDispatch?.status  }
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

                    <div className='flex gap-3' >
                      <a href={`http://127.0.0.1:4000/uploads/${data?.Preliminary?.filePath}`} >
                        <button>Download File</button>
                      </a>
                      {
                        data?.Preliminary?.status !== 'approved' ?
                        <AiFillDelete className='text-xl cursor-pointer text-black ' onClick={deleteSelected.bind(this,details?.fileNum,"Preliminary")} />
                        :
                        null
                      }
                    </div>
                    :
                    <input type="file" name='Preliminary' onChange={fileHandler.bind(this,data?.fileNum)}  placeholder="Male" className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
                }
              </td>
              <td className="px-6 py-4">
                {DateFormatter(data?.Preliminary?.dateTime)}
              </td>
              <td className="px-6 py-4">
                {data?.Preliminary?.status === 'pending' ? "" : data?.Preliminary?.status}
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

                    <div className='flex gap-3' >
                      <a href={`http://127.0.0.1:4000/uploads/${data?.receivingDdr?.filePath}`} >
                        <button>Download File</button>
                      </a>
                      {
                        data?.receivingDdr?.status !== 'approved' ?
                        <AiFillDelete className='text-xl cursor-pointer text-black ' onClick={deleteSelected.bind(this,details?.fileNum,"receivingDdr")} />
                        :
                        null
                      }
                    </div>

                    :
                    <input type="file" name='receivingDdr' onChange={fileHandler.bind(this,data?.fileNum)} placeholder="Male" className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
                }
              </td>
              <td className="px-6 py-4">
                {DateFormatter(data?.receivingDdr?.dateTime)}
              </td>
              <td className="px-6 py-4">
                {data?.receivingDdr?.status === 'pending' ? "" :  data?.receivingDdr?.status}
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
                    <div className='flex gap-3' >
                      <a href={`http://127.0.0.1:4000/uploads/${data?.dispatchDdr?.filePath}`} >
                        <button>Download File</button>
                      </a>
                      {
                        data?.dispatchDdr?.status !== 'approved' ?
                        <AiFillDelete className='text-xl cursor-pointer text-black ' onClick={deleteSelected.bind(this,details?.fileNum,"dispatchDdr")} />
                        :
                        null
                      }
                    </div>

                    :
                    <input type="file" name='dispatchDdr' onChange={fileHandler.bind(this,data?.fileNum)} placeholder="Male" className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
                }
              </td>
              <td className="px-6 py-4">
                {DateFormatter(data?.dispatchDdr?.dateTime)}
              </td>
              <td className="px-6 py-4">
                {data?.dispatchDdr?.status === 'pending' ? "" : data?.dispatchDdr?.status }
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
                    <div className='flex gap-3' >
                      <a href={`http://127.0.0.1:4000/uploads/${data?.chemical?.filePath}`} >
                        <button>Download File</button>
                      </a>
                      {
                        data?.chemical?.status !== 'approved' ?
                        <AiFillDelete className='text-xl cursor-pointer text-black ' onClick={deleteSelected.bind(this,details?.fileNum,"chemical")} />
                        :
                        null
                      }
                    </div>

                    :
                    <input type="file" name='chemical'  onChange={fileHandler.bind(this,data?.fileNum)} placeholder="Male" className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
                }
              </td>
              <td className="px-6 py-4">
                {DateFormatter(data?.chemical?.dateTime)}
              </td>
              <td className="px-6 py-4">
                {data?.chemical?.status === 'pending' ? "" : data?.chemical?.status}
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

                    <div className='flex gap-3' >
                      <a href={`http://127.0.0.1:4000/uploads/${data?.histopathological?.filePath}`} >
                        <button>Download File</button>
                      </a>
                      {
                        data?.histopathological?.status !== 'approved' ?
                        <AiFillDelete className='text-xl cursor-pointer text-black ' onClick={deleteSelected.bind(this,details?.fileNum,"histopathological")} />
                        :
                        null
                      }
                    </div>

                    :
                    <input type="file" name='histopathological' onChange={fileHandler.bind(this,data?.fileNum)} placeholder="Male" className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
                }
              </td>
              <td className="px-6 py-4">
                {DateFormatter(data?.histopathological?.dateTime)}
              </td>
              <td className="px-6 py-4">
                {data?.histopathological?.status === 'pending' ? "" : data?.histopathological?.status }
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

                    <div className='flex gap-3' >
                      <a href={`http://127.0.0.1:4000/uploads/${data?.causeOfdDeath?.filePath}`} >
                        <button>Download File</button>
                      </a>
                      {
                        data?.causeOfdDeath?.status !== 'approved' ?
                        <AiFillDelete className='text-xl cursor-pointer text-black ' onClick={deleteSelected.bind(this,details?.fileNum,"causeOfdDeath")} />
                        :
                        null
                      }
                    </div>

                    :
                    <input type="file" name='causeOfdDeath' onChange={fileHandler.bind(this,data?.fileNum)} placeholder="Male" className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
                }
              </td>
              <td className="px-6 py-4">
                {DateFormatter(data?.causeOfdDeath?.dateTime)}
              </td>
              <td className="px-6 py-4">
                {data?.causeOfdDeath?.status === 'pending' ? "" : data?.causeOfdDeath?.status}
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
                    <div className='flex gap-3' >
                      <a href={`http://127.0.0.1:4000/uploads/${data?.Inquest?.filePath}`} >
                        <button>Download File</button>
                      </a>
                      {
                        data?.Inquest?.status !== 'approved' ?
                        <AiFillDelete className='text-xl cursor-pointer text-black ' onClick={deleteSelected.bind(this,details?.fileNum,"Inquest")} />
                        :
                        null
                      }
                    </div>

                    :
                    <input type="file" name='Inquest' onChange={fileHandler.bind(this,data?.fileNum)}  placeholder="Male" className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
                }
              </td>
              <td className="px-6 py-4">
                {DateFormatter(data?.Inquest?.dateTime)}
              </td>
              <td className="px-6 py-4">
                {data?.Inquest?.status === 'pending' ? "" : data?.Inquest?.status}
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

              </td>
              <td className="px-6 py-4">
                {DateFormatter(data?.ordersOfPshrc?.dateTime)}
              </td>
              <td className="px-6 py-4">
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
                    <div className='flex gap-3' >
                      <a href={`http://127.0.0.1:4000/uploads/${data?.compilance?.filePath}`} >
                        <button>Download File</button>
                      </a>
                      {
                        data?.compilance?.status !== 'approved' ?
                        <AiFillDelete className='text-xl cursor-pointer text-black ' onClick={deleteSelected.bind(this,details?.fileNum,"compilance")} />
                        :
                        null

                      }
                    </div>

                    :
                    <input type="file" name='compilance' onChange={fileHandler.bind(this,data?.fileNum)} placeholder="Male" className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
                }
              </td>
              <td className="px-6 py-4">
                {DateFormatter(data?.compilance?.dateTime)}
              </td>
              <td className="px-6 py-4">
                {data?.compilance?.status === 'pending' ? "" : data?.compilance?.status}
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

              </td>
              <td className="px-6 py-4">
                {DateFormatter(data?.finalOrder?.dateTime)}
              </td>
              <td className="px-6 py-4">
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
                  <path stroke="currentColor" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
              <div className="p-6 text-center pt-10 ">
                
                <h3 className="mb-5 text-lg font-normal text-black dark:text-gray-400">Are you sure you want to <span className='font-bold' >Delete</span>  this File?</h3>


                <button onClick={deleteHandler} data-modal-hide="popup-modal" type="button" className="text-white bg-blue-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2">
                  Yes, I'm sure
                </button>
                <button data-modal-hide="popup-modal" onClick={()=>setIsOpen(false)}type="button" className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">No, cancel</button>
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

export default EditCase