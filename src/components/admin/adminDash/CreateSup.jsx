import React, { useState } from 'react'
import { useMutation } from 'react-query'
import { createuser } from '../../../utills/api/adminDash'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const CreateSup = () => {

    const { mutateAsync : userDetails,data } = useMutation('createuser',createuser)
    const navigate = useNavigate()
    const [err, setErr ] = useState({
        nameErr : "",
        emailErr : "",
        phoneErr : "",
        passwordErr : "",
        jailAddressErr : "",
        pincodeErr : "",
    })

    const [details, setDetails] = useState({
        name : "",
        email : "",
        phone : "",
        password : "",
        jailAddress : "",
        pincode : "",
        image : ""
    });

    const changeHandler = (e) =>{
        setErr((oldErr)=> ({...oldErr,[`${e.target.name}Err`] : "" }))
        setDetails((old) => ({...old,[e.target.name] : e.target.value}))

    }
    const fileHandler = (e) =>{
        setDetails((old)=>({...old, [e.target.name] : e.target.files[0]  }) )
    }
    const submitHandler = async(e) =>{
        e.preventDefault()

        const { name,email,phone,password,jailAddress,pincode,image } = details;

        const newErr = {
          nameErr: "",
          emailErr: "",
          phoneErr: "",
          passwordErr: "",
          jailAddressErr: "",
          pincodeErr: "",
        };
      
        let isValid = true;
      
        if (!name || name.length < 3 ) {
          newErr.nameErr = "min length is 3";
          isValid = false;
        }
      
        if (!email) {
          newErr.emailErr = "Email is required";
          isValid = false;
        }
      
        if (!phone || phone.length !== 10 ) {
          newErr.phoneErr = "Please enter valid Phone number";
          isValid = false;
        }
      
        if (!password || password.length < 7) {
          newErr.passwordErr = "min 7 char are required";
          isValid = false;
        }
      
        if (!jailAddress || jailAddress.length < 3 ) {
          newErr.jailAddressErr = "Please Enter valid address";
          isValid = false;
        }
      
        if (!pincode || pincode.length !== 6 ) {
          newErr.pincodeErr = "Enter Valid Pincode";
          isValid = false;
        }
      
      
        if (!isValid) {
          setErr(newErr);
          return;
        }
        setErr({});


        const formData = new FormData();
        formData.append('name',name)
        formData.append('email',email)
        formData.append('phone',phone)
        formData.append('password',password)
        formData.append('jailAddress',jailAddress)
        formData.append('pincode',pincode)
        formData.append('image',image)


        await userDetails(details)
        .then((res)=>{
            navigate('/supdtlist')
            toast.success("created Successfully !", {
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
            <p className='text-white font-bold text-xl' >Create Supdt.'s Profile</p>
        </div>

        <form className="grid grid-cols-1 gap-6 mt-16 md:grid-cols-2 md:w-2/3" onSubmit={submitHandler} encType='multipart/form-data' >
                  <div>
                      <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">Full Name</label>
                      <input type="text" name='name' value={details.name} onChange={changeHandler}  placeholder="John Deo" className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" required />
                      <p className='font-mono text-red-700' >{err.nameErr ? err.nameErr : ""}</p>
                  </div>
                  <div>
                      <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">Email address</label>
                      <input type="email" name='email' value={details.email} onChange={changeHandler} placeholder="johnsnow@example.com" className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" required />
                      <p className='font-mono text-red-700' >{err.emailErr ? err.emailErr : ""}</p>
                  
                  </div>

                  <div>
                      <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">Phone number</label>
                      <input type="text" name='phone' value={details.phone} onChange={changeHandler} placeholder="XX-XXX-XX-XXX" className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" required />
                      <p className='font-mono text-red-700' >{err.phoneErr ? err.phoneErr : ""}</p>

                  </div>

                  <div>
                      <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">Password</label>
                      <input type="password" name="password" value={details.password} onChange={changeHandler} placeholder="Enter your password" className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" required />
                      <p className='font-mono text-red-700' >{err.passwordErr ? err.passwordErr : ""}</p>
                 
                  </div>
                  <div>
                      <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">Jail Address</label>
                      <input type="text" name="jailAddress" value={details.jailAddress} onChange={changeHandler} placeholder="Amritsar" className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" required />
                      <p className='font-mono text-red-700' >{err.jailAddressErr ? err.jailAddressErr : ""}</p>
                  
                  </div>
                  <div>
                      <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">Pincode</label>
                      <input type="text" name='pincode' value={details.pincode} onChange={changeHandler} placeholder="123456" className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" required />
                      <p className='font-mono text-red-700' >{err.pincodeErr ? err.pincodeErr : ""}</p>
                  
                  </div>
                  <div>
                      <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">Upload Image</label>
                      <input type="file" name='image' onChange={fileHandler} placeholder="123456" className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
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

export default CreateSup