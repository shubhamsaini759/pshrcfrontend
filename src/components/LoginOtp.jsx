import React, { useEffect, useState } from 'react'
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { login, veriFyAccount } from '../utills/api/login';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import useTimer from '../hooks/useTimer'

const LoginOtp = ({stepHandler}) => {
    
    const navigate = useNavigate();
    const email = useSelector((state) => state.EmailReducer.email)
    const userDetails = useSelector((state) => state.EmailReducer)

    const {timeLeft, startTimer, isTimerNotStarted } = useTimer(30);
    const [ err, setErr] = useState('')

    const { mutateAsync : userOtp, status : otpStatus } = useMutation('veriFyAccount',veriFyAccount)
    const { mutateAsync : resendOtp } = useMutation('login',login)
    const [ datas, setDatas ] = useState({
        otp : "",
        email : email
    })


    const changeHandler = (e) =>{
        setErr("")
        setDatas((old)=> ({...old,[e.target.name] : e.target.value }) )
    }

    const formHandler = async(e) => {
        e.preventDefault();

        await userOtp(datas)
        .then((res)=>{
            stepHandler();
            localStorage.setItem('token',res?.auth)
            localStorage.setItem('userId',res?.user?._id)
            res?.user?.name === 'admin' ?  navigate('/dashboard'): navigate('/home')
            console.log(res.response)
        })
        .catch((err)=>{
            console.log(err.response.data)
            setErr('wrong otp')
            err.response.data === "otp expired" ? setResend(true) : setResend(false)
        })
    }

    const resendHandler = async() =>{
        await resendOtp(userDetails)
        .then((res)=>{
            toast.success("OTP Sent Successfully !", {
                position: toast.POSITION.TOP_RIGHT,
              });
              startTimer();
                setErr("")

        })
        .catch((err)=>{
            console.log(err)
        })
    }


    useEffect(()=>{
        startTimer()
    },[])
    
    


  return (
    <div className="relative mt-6 px-10 md:px-20 ">
        <h1 className="text-2xl font-semibold tracking-wider text-gray-800 capitalize dark:text-white">
            We've sent you an Email
        </h1>
        <p className="mt-4 text-gray-500 dark:text-gray-400">
            To complete the verification process please enter the 6 digit code below.
        </p>
        <form className="mt-8" onSubmit={formHandler}>
            <div>
                <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">OTP</label>
                <input type="text" name='otp' value={datas.otp} onChange={changeHandler} placeholder="- - - - - -" className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
            </div>
            <p className='font-mono text-red-700'>{ err ? err : ""} </p>
            <button
                className="flex items-center md:w-1/2 justify-between mt-8 w-full px-6 py-3 text-sm tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-md hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50">
                <span>Confirm </span>
            </button>
        </form>
        {
            otpStatus === 'loading' ? 
            <div role="status" className="absolute -translate-x-1/2 -translate-y-1/2 top-2/4 left-1/2 z-10 ">
                <svg aria-hidden="true" className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/></svg>
                <span className="sr-only">Loading...</span>
            </div>
            :
            null
        }


        {
            isTimerNotStarted ? 
            <button
                onClick={resendHandler}
                className="flex items-center md:w-1/2 justify-between mt-8 w-full px-6 py-3 text-sm tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-md hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50">
                <span>Resend </span>
            </button>
            : <p className='pt-6' > Resend OTP in {timeLeft}s</p>
        }


    </div>
  )
}

export default LoginOtp