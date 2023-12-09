import React, { useState } from 'react'
import { useMutation } from 'react-query';
import { login } from '../utills/api/login';
import { useDispatch } from 'react-redux';
import { emailActions } from '../store';

const LoginForm = ({stepHandler}) => {

  const { mutateAsync : userDetails, status : loginStatus  } = useMutation('login',login)
  const dispatch = useDispatch();

  const [ user, setUser ] = useState({
    email : "",
    password : ""
  })
  const [isErr, setIsErr] = useState(false)

  const [err,setErr] = useState({
    emailErr : "",
    passwordErr : ""
  })


  const changeHandler = (e) => {
    setErr((old) => ({...old,[`${e.target.name}Err`] : "" }) )
    setUser((old) =>({...old,[e.target.name] : e.target.value }) )
  }

    const formHandler = async(e) => {
        e.preventDefault();

        const { email,password } = user
        const newErr = {
            emailErr : "",
            passwordErr : ""
        }        
        let isValid = true

        if(!email ){
            newErr.emailErr = 'please enter valid email'
            isValid = false
        }
        if(!password || password.length < 7 ){
            newErr.passwordErr = 'please enter valid password'
            isValid = false
        }

        if(!isValid){
            setErr(newErr)
            return
        }
        setErr({})

        
        await userDetails(user)
        .then((res)=>{
            console.log(res)
            dispatch(emailActions.email({ email : user.email }))
            dispatch(emailActions.pass({ pass : user.password }))

            stepHandler();
        })
        .catch((err)=>{
            console.log(err)
            setIsErr(true)
        })
    }

  return (
    <div className="relative mt-6 px-10 md:px-20 ">
        <h1 className="text-2xl font-semibold tracking-wider text-gray-800 capitalize dark:text-white">
            Lets Get Start
        </h1>
        <form className="mt-8 " onSubmit={formHandler}>
        <div className=' flex justify-center pt-4 ' >
            { isErr ? <p className='font-mono text-red-900'>Invalid Details!</p> : "" }
                
            </div>
            <div  >
                <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">Email address</label>
                <input type="email" name='email' value={user.email} onChange={changeHandler}  placeholder="johnsnow@example.com" className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
                <p className='font-mono text-red-700' >{err.emailErr ? err.emailErr : ""}</p>
            </div>
            <div className='mt-8' >
                <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">Password</label>
                <input type="password" name='password' value={user.password} onChange={changeHandler} placeholder="Enter your password" className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
                <p className='font-mono text-red-700' >{err.passwordErr ? err.passwordErr : ""}</p>
            </div>
           
            <button
               
                className="flex items-center md:w-1/2 justify-between mt-8 w-full px-6 py-3 text-sm tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-md hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50">
                <span> Get OTP </span>

                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 rtl:-scale-x-100" viewBox="0 0 20 20" fill="currentColor">
                    <path 
                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                        />
                </svg>
            </button>
        </form>
        {
            loginStatus === 'loading' ? 
            <div role="status" className="absolute -translate-x-1/2 -translate-y-1/2 top-2/4 left-1/2 z-10 ">
                <svg aria-hidden="true" className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/></svg>
                <span className="sr-only">Loading...</span>
            </div>
            :
            null
        }
    </div>
  )
}

export default LoginForm