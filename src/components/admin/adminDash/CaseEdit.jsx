import React, { useEffect, useRef, useState } from 'react'
import { AiOutlineUserAdd, AiFillEye, AiFillEdit, AiFillDelete } from "react-icons/ai";
import DeletePop from './DeleteFilePop';
import { caseDetails } from '../../../utills/api/adminDash';
import { useMutation, useQuery } from 'react-query';
import { useLocation } from 'react-router-dom';
import { deleteFile, updatedeceased } from '../../../utills/api/user';
import { DateFormatter } from '../../../utills/helpers/DateFormatter';
import { toast } from 'react-toastify';


const CaseEdit = () => {
  const { state } = useLocation();

  const [isOpen, setIsOpen] = useState(false);
  const [isApprove, setIsApprove] = useState(false);
  const [ isDelete, setIsDelete ] = useState(false)

  const selectedType = useRef(null);
  const textareaRef = useRef(null)

  const [details, setDetails] = useState({
    fileNum : "",
    deceasedName: "",
    incidentDate: "",
    incidentDetails: "",
    incidentPlace: "",
    gender: "",
    attributeName : "",
    status : "",
    message : ""
  })



  const { data, refetch : detailsFetch } = useQuery('caseDetails', caseDetails.bind(this, state),{ onSuccess : (x) => {
    setDetails({
      fileNum : x?.fileNum,
      deceasedName : x?.deceasedName,
      incidentDate : DateFormatter(x?.incidentDate),
      incidentDetails : x?.incidentDetails,
      incidentPlace : x?.incidentPlace,
      gender : x?.gender,
    })

  } })

  const { mutateAsync : updatedDetails } = useMutation('updatedeceased',updatedeceased)
  const { mutateAsync : deletedData } = useMutation('deleteFile',deleteFile)

  const selectHandler = (type, e) => {
    selectedType.current = type;
    if (e.target.value === "rejected") {
      setIsOpen(true)
    } else if (e.target.value === "approved") {
      setIsApprove(true)
      
    }
    return
  }

  const approveConfirmHandler = async() => {
    const formData = new FormData();
    formData.append('newStatus','approved')
    formData.append('newMessage','')
    formData.append('attributeName',selectedType.current)
    formData.append('fileNum',data?.fileNum)


    await updatedDetails(formData)
    .then((res)=>{
      detailsFetch()
      setIsApprove(false)
      toast.success("File is Approved !", {
        position: toast.POSITION.TOP_RIGHT,
      });

    })
    .catch((err) => {
      console.log(err)
    })

  } 



  const rejectConfirmHandler = async() => {
    const type = selectedType.current;
    const value = textareaRef.current.value;

    const formData = new FormData();
    formData.append('newStatus','rejected')
    formData.append('newMessage',value)
    formData.append('attributeName',type)
    formData.append('fileNum',data?.fileNum)
    formData.append('userId',data?.userId)

    await updatedDetails(formData)
    .then((res)=>{
      detailsFetch()
      setIsOpen(false)
      toast.success("File is Rejected !", {
        position: toast.POSITION.TOP_RIGHT,
      });

    })
    .catch((err)=>{
      console.log(err)
    })

  }

  const closeApproveHandler = () => {
    setIsApprove(false);
  }

  const closeRejectHandler = () => {
    setIsOpen(false);
  }

  const changeHandler = async (e) => {
    setDetails((old) => ({ ...old, [e.target.name]: e.target.value }))
  }


  const uploadHandler = async(fileNum,e)=>{

    const formData = new FormData()
    formData.append([e.target.name],e.target.files[0])
    formData.append('fileNum',fileNum)

    await updatedDetails(formData)
    .then((res)=>{
      detailsFetch()
      toast.success("uploaded Sucessfully !", {
        position: toast.POSITION.TOP_RIGHT,
      });
    })
    .catch((err)=>{
      console.log(err)
    })
  }

  const [ deleted, setDeleted ] = useState({
    attributeName : "",
    fileNum : ""
  })
  const deleteSelected = (fileNum,attributeName) =>{
    setDeleted((old)=> ({...old,fileNum,attributeName}))
    setIsDelete(true)
  }
 
  const submitHandler = async(e) => {
    e.preventDefault()
    const { fileNum, deceasedName,incidentDate,incidentDetails,incidentPlace,gender} = details

    const formData = new FormData();
    formData.append('fileNum',fileNum)
    formData.append('deceasedName',deceasedName)
    formData.append('incidentDate',incidentDate)
    formData.append('incidentPlace',incidentPlace)
    formData.append('gender',gender)

    await updatedDetails(formData)
    .then((res)=>{
      detailsFetch()
      toast.success("updated Successfully !", {
        position: toast.POSITION.TOP_RIGHT,
      });
    })
    .catch((err)=>{
      console.log(err)
    })
  }

  const deleteHandler = async() =>{
    await deletedData(deleted)
    .then((res)=>{
      detailsFetch()
      setIsDelete(false)
      toast.success("deleted Successfully !", {
        position: toast.POSITION.TOP_RIGHT,
      });
    })
    .catch((err)=>{
      console.log(err)
    })
  }



  return (
    <>
      <div className='bg-blue-950 w-4/5 p-6 px-6 flex items-center justify-center cursor-pointer ' >
        <p className='text-white font-bold text-xl' >Case Details</p>
      </div>
      <form className="text-gray-700 pt-10 " onSubmit={submitHandler} encType='multipart/form-data' >
        <div className="grid md:grid-cols-2 gap-4 text-lg">
          <div className="grid grid-cols-2">
            <div className="px-4 py-2 font-semibold">File No.</div>
            <div className="px-4 py-2">{data?.fileNum}</div>
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
        </div>
        <div className='pt-8 pr-10 w-full flex justify-end items-end ' >
          <button
          type='submit'
            className="flex items-center justify-between w-24 px-6 py-3 text-sm tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-md hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50" >
            <span>Submit </span>
          </button>
      </div>
      </form>

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
              <td className="px-6 py-4 flex gap-4">
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
              <td className="px-6 py-4">
                
                {
                  !data?.tpm?.filePath ? null :
                    data?.tpm?.status === 'pending'  && data?.tpm?.filePath ?
                    <select   onChange={selectHandler.bind(this, 'tpm')} className='z-10 w-28 absolute bg-white divide-y divide-gray-100  shadow  dark:bg-gray-700 dark:divide-gray-600' >
                      <option value=''>select</option>
                      <option className='block px-4 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white' value='approved' >Approved</option>
                      <option value='rejected'  >Reject</option>
                    </select>
                    :
                    data?.tpm?.status
                }
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
              <td className="px-6 py-4 flex gap-4">
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
              <td className="px-6 py-4">
                {
                  !data?.pmr?.filePath ? null :
                  data?.pmr?.status === 'pending' && data?.pmr?.filePath ?
                    <select onChange={selectHandler.bind(this, 'pmr')} className='z-10  w-28 absolute bg-white divide-y divide-gray-100  shadow   dark:bg-gray-700 dark:divide-gray-600' >
                      <option>select </option>
                      <option className='block px-4 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white' value='approved' >Approved</option>
                      <option value='rejected'  >Reject</option>
                    </select>
                    :
                    data?.pmr?.status
                }
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
              <td className="px-6 py-4 flex gap-4">
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
              <td className="px-6 py-4">
                {
                  !data?.ppr?.filePath ? null :
                    data?.ppr?.status === 'pending' && data?.ppr?.filePath ?
                      <select  onChange={selectHandler.bind(this, 'ppr')} className='z-10 absolute bg-white divide-y divide-gray-100  shadow  w-28 dark:bg-gray-700 dark:divide-gray-600' >
                        <option>select </option>
                        <option className='block px-4 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white' value='approved' >Approved</option>
                        <option value='rejected'  >Reject</option>
                      </select>
                      :
                      data?.ppr?.status
                }
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
              <td className="px-6 py-4 flex gap-4">
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
              <td className="px-6 py-4">
                {
                  !data?.medical?.filePath ? null :

                  data?.medical?.status === 'pending' && data?.medical?.filePath ?
                    <select  onChange={selectHandler.bind(this, 'medical')} className='z-10 absolute bg-white divide-y divide-gray-100  shadow  w-28 dark:bg-gray-700 dark:divide-gray-600' >
                      <option>select </option>
                      <option className='block px-4 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white' value='approved' >Approved</option>
                      <option value='rejected'  >Reject</option>
                    </select> 
                    :
                    data?.medical?.status
                }
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
                Recieiving and Dispatch from Lab
              </td>
              <td className="px-6 py-4 flex gap-4">
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
              <td className="px-6 py-4">
                {
                  !data?.receivingAndDispatch?.filePath ? null :

                  data?.receivingAndDispatch?.status === 'pending' && data?.receivingAndDispatch?.filePath ?
                    <select  onChange={selectHandler.bind(this, 'receivingAndDispatch')} className='z-10 absolute bg-white divide-y divide-gray-100  shadow  w-28 dark:bg-gray-700 dark:divide-gray-600' >
                      <option>select </option>
                      <option className='block px-4 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white' value='approved' >Approved</option>
                      <option value='rejected'  >Reject</option>
                    </select>
                    :
                    data?.receivingAndDispatch?.status
                }
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
              <td className="px-6 py-4 flex gap-4">
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
              <td className="px-6 py-4">
                {
                  !data?.Preliminary?.filePath ? null :

                  data?.Preliminary?.status === 'pending' &&  data?.Preliminary?.filePath ?
                    <select   onChange={selectHandler.bind(this, 'Preliminary')} className='z-10 absolute bg-white divide-y divide-gray-100  shadow  w-28 dark:bg-gray-700 dark:divide-gray-600' >
                      <option>select </option>
                      <option className='block px-4 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white' value='approved' >Approved</option>
                      <option value='rejected'  >Reject</option>
                    </select>
                    :
                    data?.Preliminary?.status
                }
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
              <td className="px-6 py-4 flex gap-4">
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
              <td className="px-6 py-4">
                {
                  !data?.receivingDdr?.filePath ? null :

                  data?.receivingDdr?.status === 'pending' && data?.tpm?.filePath ?
                    <select  onChange={selectHandler.bind(this, 'receivingDdr')} className='z-10 absolute bg-white divide-y divide-gray-100  shadow  w-28 dark:bg-gray-700 dark:divide-gray-600' >
                      <option>select </option>
                      <option className='block px-4 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white' value='approved' >Approved</option>
                      <option value='rejected'  >Reject</option>
                    </select>
                    :
                    data?.receivingDdr?.status
                }
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
              <td className="px-6 py-4 flex gap-4">
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
              <td className="px-6 py-4">
                {
                  !data?.dispatchDdr?.filePath ? null :

                  data?.dispatchDdr?.status === 'pending' && data?.dispatchDdr?.filePath ?
                    <select   onChange={selectHandler.bind(this, 'dispatchDdr')} className='z-10 absolute bg-white divide-y divide-gray-100  shadow  w-28 dark:bg-gray-700 dark:divide-gray-600' >
                      <option>select </option>
                      <option className='block px-4 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white' value='approved' >Approved</option>
                      <option value='rejected'  >Reject</option>
                    </select>
                    :
                    data?.dispatchDdr?.status
                }
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
              <td className="px-6 py-4 flex gap-4">
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
                {
                  !data?.chemical?.filePath ? null :

                  data?.chemical?.status === 'pending' &&   data?.chemical?.filePath  ?
                    <select  onChange={selectHandler.bind(this, 'chemical')} className='z-10 absolute bg-white divide-y divide-gray-100  shadow  w-28 dark:bg-gray-700 dark:divide-gray-600' >
                      <option>select </option>
                      <option className='block px-4 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white' value='approved' >Approved</option>
                      <option value='rejected'  >Reject</option>
                    </select>
                    :
                    data?.chemical?.status
                }
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
              <td className="px-6 py-4 flex gap-4">
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
              <td className="px-6 py-4">
                {
                  !data?.histopathological?.filePath ? null :

                  data?.histopathological?.status === 'pending' && data?.histopathological?.filePath  ?
                    <select   onChange={selectHandler.bind(this, 'histopathological')} className='z-10 absolute bg-white divide-y divide-gray-100  shadow  w-28 dark:bg-gray-700 dark:divide-gray-600' >
                      <option>select </option>
                      <option className='block px-4 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white' value='approved' >Approved</option>
                      <option value='rejected'  >Reject</option>
                    </select>
                    :
                    data?.histopathological?.status
                }
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
              <td className="px-6 py-4 flex gap-4">
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
                {DateFormatter(data?.causeOfdDeath?.dateTime)}
              </td>
              <td className="px-6 py-4">
                {
                  !data?.causeOfdDeath?.filePath ? null :

                  data?.causeOfdDeath?.status === 'pending' && data?.causeOfdDeath?.filePath  ?
                    <select   onChange={selectHandler.bind(this, 'causeOfdDeath')} className='z-10 absolute bg-white divide-y divide-gray-100  shadow  w-28 dark:bg-gray-700 dark:divide-gray-600' >
                      <option>select </option>
                      <option className='block px-4 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white' value='approved' >Approved</option>
                      <option value='rejected'  >Reject</option>
                    </select>
                    :
                    data?.causeOfdDeath?.status
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
              <td className="px-6 py-4 flex gap-4">
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
                {
                  !data?.Inquest?.filePath ? null :

                  data?.Inquest?.status === 'pending' && data?.Inquest?.filePath  ?
                    <select  onChange={selectHandler.bind(this, 'Inquest')} className='z-10 absolute bg-white divide-y divide-gray-100  shadow  w-28 dark:bg-gray-700 dark:divide-gray-600' >
                      <option>select </option>
                      <option className='block px-4 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white' value='approved' >Approved</option>
                      <option value='rejected'  >Reject</option>
                    </select>
                    :
                    data?.Inquest?.status
                }
              </td>

            </tr>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"  >
              <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                13.
              </th>
              <td className="px-6 py-4">
                {/*  */}
              </td>
              <td className="px-6 py-4">
                Orders of PSHRC
              </td>
              <td className="px-6 py-4 flex gap-4">
                {
                  data?.ordersOfPshrc?.filePath ?
                    <div className='flex gap-4' >
                      <a href={`http://127.0.0.1:4000/uploads/${data?.ordersOfPshrc?.filePath}`} >
                        <button className='text-blue-800'>Download File</button>
                      </a>
                        <AiFillDelete className='text-xl cursor-pointer text-black ' onClick={deleteSelected.bind(this,data?.fileNum,"ordersOfPshrc")} />
                    </div>
                    
                    :
                    <input type="file" name='ordersOfPshrc' onChange={uploadHandler.bind(this,data?.fileNum)} className="block w-72 px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />

                }
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
              <td className="px-6 py-4 flex gap-4">
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
              <td className="px-6 py-4">
                {
                  !data?.compilance?.filePath ? null :

                  data?.compilance?.status === 'pending' &&  data?.compilance?.filePath ?
                    <select   onChange={selectHandler.bind(this, 'compilance')} className='z-10 absolute bg-white divide-y divide-gray-100  shadow  w-28 dark:bg-gray-700 dark:divide-gray-600' >
                      <option>select </option>
                      <option className='block px-4 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white' value='approved' >Approved</option>
                      <option value='rejected'  >Reject</option>
                    </select>
                    :
                    data?.compilance?.status
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
              <td className="px-6 py-4 flex gap-4">
                {
                  data?.finalOrder?.filePath ?
                    <div className='flex gap-4' >
                      <a href={`http://127.0.0.1:4000/uploads/${data?.finalOrder?.filePath}`} >
                        <button className='text-blue-800'>Download File</button>
                      </a>
                      <AiFillDelete className='text-xl cursor-pointer text-black ' onClick={deleteSelected.bind(this,data?.fileNum,"finalOrder")} />
                      
                    </div>
                    :
                    <input type="file" name='finalOrder' onChange={uploadHandler.bind(this,data?.fileNum)} placeholder="Male" className="block w-72 px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />

                }
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
                  <button type="button" onClick={closeRejectHandler} className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="popup-modal">
                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                    </svg>
                    <span className="sr-only">Close modal</span>
                  </button>
                  <div className="p-6 text-center pt-10 ">
                    {/* <svg className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                                </svg> */}
                    <h3 className="mb-5 text-lg font-normal text-black dark:text-gray-400">Are you sure you want to <span className='font-bold' >Reject</span>  this product?</h3>

                    <div className='mb-6' >
                      <label className="mb-2 text-sm font-bold flex text-gray-600 dark:text-gray-200">Enter the Reason</label>
                      <textarea type="" ref={textareaRef} placeholder="" className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" required />
                    </div>

                    <button onClick={rejectConfirmHandler} data-modal-hide="popup-modal" type="button" className="text-white bg-blue-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2">
                      Yes, I'm sure
                    </button>
                    <button data-modal-hide="popup-modal" onClick={closeRejectHandler} type="button" className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">No, cancel</button>
                  </div>
                </div>
              </div>
            </div>
          </>
          :
          null
      }

      {
        isApprove ?
          <>
            <div className="justify-center bg-black bg-opacity-40 items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none p-5" >
              <div className="relative w-full max-w-md max-h-full ">
                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                  <button type="button" onClick={closeApproveHandler} className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="popup-modal">
                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                    </svg>
                    <span className="sr-only">Close modal</span>
                  </button>
                  <div className="p-6 text-center pt-10 ">
                    <h3 className="mb-5 text-lg font-normal text-black dark:text-gray-400">Are you sure you want to <span className='font-bold' >Approve</span> this product?</h3>
                    <button onClick={approveConfirmHandler} data-modal-hide="popup-modal" type="button" className="text-white bg-blue-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2">
                      Yes, I'm sure
                    </button>
                    <button data-modal-hide="popup-modal" onClick={closeApproveHandler} type="button" className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">No, cancel</button>
                  </div>
                </div>
              </div>
            </div>
          </>
          :
          null
      }



{
        isDelete ? 
        <>
        <div className="justify-center bg-black bg-opacity-40 items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none p-5" >
          <div className="relative w-full max-w-md max-h-full ">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <button type="button" onClick={()=>setIsDelete(false)} className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="popup-modal">
                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
              <div className="p-6 text-center pt-10 ">
                {/* <svg className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"  d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                            </svg> */}
                <h3 className="mb-5 text-lg font-normal text-black dark:text-gray-400">Are you sure you want to <span className='font-bold' >Delete</span>  this File?</h3>


                <button onClick={deleteHandler} data-modal-hide="popup-modal" type="button" className="text-white bg-blue-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2">
                  Yes, I'm sure
                </button>
                <button data-modal-hide="popup-modal" onClick={()=>setIsDelete(false)}type="button" className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">No, cancel</button>
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

export default CaseEdit