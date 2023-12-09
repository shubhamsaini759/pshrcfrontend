import React, { useState } from 'react'
import LoginNavbar from '../components/LoginNavbar'
import login from '../assets/login.png'
import { Outlet } from 'react-router-dom'
import LoginOtp from '../components/LoginOtp'
import LoginForm from '../components/LoginForm'


const Login = () => {
  const [activeStep, setActiveStep] = useState({
    step1: true,
    step2: false,
  })

  const changeHandler = (uid) => {
    if(uid === "step1") {
      setActiveStep({
        step1: false,
        step2: true,
      })
      return;
    }

    if(uid === "step2") {
      // OTP API call

      return;
    }

  }

  return (
    <div>
      <LoginNavbar />
      <div className=' pt-28 flex w-full h-screen justify-between  ' >
        <div className='hidden md:block w-1/2 border-r-2 border-black' > 
          <img src={login} alt='image' className='w-3/4 pt-36 pl-28 '   />
        </div>
        <div className='w-full md:w-1/2 pt-14 md:pt-24' >
           {activeStep.step1 ?  <LoginForm stepHandler={changeHandler.bind(this, 'step1')} /> : null}
           {activeStep.step2 ?  <LoginOtp stepHandler={changeHandler.bind(this, 'step2')} /> : null}
        </div>
      </div>
    </div>
  )
}

export default Login