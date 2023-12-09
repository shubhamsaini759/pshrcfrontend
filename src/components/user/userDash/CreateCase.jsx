import React, { useEffect, useState } from 'react'
import { useMutation } from 'react-query'
import { createdeceased } from '../../../utills/api/user'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const CreateCase = () => {
    const { mutateAsync : details } = useMutation('createdeceased',createdeceased)
    const navigate = useNavigate()

    const [ caseDetails, setCaseDetails ] = useState({
        deceasedName : "",
        incidentDate : "",
        incidentPlace : "",
        userId : localStorage.getItem('userId'),
        gender : "",
        incidentDetails : ""
    })

    const [caseErr, setCaseErr] = useState({
        deceasedNameErr : "",
        incidentDateErr : "",
        incidentPlaceErr : "",
        genderErr : "",
        incidentDetailsErr : ""
    })


    const changeHandler = (e) => {
        setCaseErr((oldErr) => ({...oldErr,[`${e.target.name}Err`] : "" }) )
        setCaseDetails((old)=>({...old,[e.target.name] : e.target.value}))
    }
    
    const submitHandler = async(e) =>{
        e.preventDefault();
        
        const { deceasedName,incidentDate,incidentPlace,gender,incidentDetails } = caseDetails;

        const newErr = {
            deceasedNameErr : "",
            incidentDateErr : "",
            incidentPlaceErr : "",
            genderErr : "",
            incidentDetailsErr : ""
        }

        let isValid = true;

        if(!deceasedName || deceasedName.length < 3 ){
            newErr.deceasedNameErr = 'min 3 char are required'
            isValid = false
        }
        if(!incidentDate){
            newErr.incidentDateErr = 'incident date is required'
            isValid = false
        }
        if(!incidentPlace || incidentPlace.length < 3 ){
            newErr.incidentPlaceErr = 'min 3 char are required'
            isValid = false
        }
        if(!gender){
            newErr.genderErr = 'please select'
            isValid = false
        }
        if(!incidentDetails || incidentDetails.length < 10 ){
            newErr.incidentDetailsErr = 'please enter more'
            isValid = false
        }
        
        if(!isValid){
            setCaseErr(newErr)
            return
        }
        setCaseErr({})


        await details(caseDetails)
        .then((res)=>{
            console.log(res)
            toast.success("created Successfully !", {
                position: toast.POSITION.TOP_RIGHT,
              });
            navigate('/home')
        })
        .catch((err)=>{
            console.log(err)
        })
    }




  return (
   <>
       
       <div className='bg-blue-950 w-4/5 p-6 px-6 flex items-center justify-center ' > 
            <p className='text-white font-bold text-xl' >Create a New Case</p>
        </div>

        <form className="grid grid-cols-1 gap-6 mt-16 md:grid-cols-2 md:w-2/3" onSubmit={submitHandler} >
            <div>
                <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">Full Name</label>
                <input type="text" name="deceasedName" value={caseDetails.deceasedName} onChange={changeHandler} placeholder="John Deo" className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" required />
                <p className='font-mono text-red-700' >{caseErr.deceasedNameErr ? caseErr.deceasedNameErr : ""}</p>

            </div>
            <div>
                <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">Incident Date</label>
                <input type="date" name='incidentDate' value={caseDetails.incidentDate} onChange={changeHandler}  placeholder="johnsnow@example.com" className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" required />
                <p className='font-mono text-red-700' >{caseErr.incidentDateErr ? caseErr.incidentDateErr : ""}</p>

            </div>

            <div>
                <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">Incident Place</label>
                <input type="canada" name='incidentPlace' value={caseDetails.incidentPlace} onChange={changeHandler}  placeholder="XX-XXX-XX-XXX" className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" required />
                <p className='font-mono text-red-700' >{caseErr.incidentPlaceErr ? caseErr.incidentPlaceErr : ""}</p>

            </div>
            
            <div>
                <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">Gender</label>
                <input type="text" name='gender' value={caseDetails.gender} onChange={changeHandler}  placeholder="Male" className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" required />
                <p className='font-mono text-red-700' >{caseErr.genderErr ? caseErr.genderErr : ""}</p>
           
            </div>
            {/* <div>
                <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">Jail Address</label>
                <input type="text" name='jailAdress' value={caseDetails.jailAdress} onChange={changeHandler}  placeholder="Amritsar" className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
            </div> */}

            <div>
                <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">Incident Details </label>
                <textarea type="file" name='incidentDetails' value={caseDetails.incidentDetails} onChange={changeHandler}  placeholder="" className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" required/>
                <p className='font-mono text-red-700' >{caseErr.incidentDetailsErr ? caseErr.incidentDetailsErr : ""}</p>

            </div>
            <div></div>
            <button
                type='submit'
                className="flex items-center justify-between w-24 px-6 py-3 text-sm tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-md hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50">
                <span>Submit </span>
            </button>
        </form>
    
   </>
  )
}

export default CreateCase