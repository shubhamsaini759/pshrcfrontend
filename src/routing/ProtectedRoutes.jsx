import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const ProtectedRoutes = (props) => {

    const { Component } = props;
    const navigate = useNavigate();

    useEffect(()=>{
        let login = localStorage.getItem('token')
        if(!login){
            navigate('/')
        }
    })

  return (
    <>
        <Component />

    </>
  )
}

export default ProtectedRoutes


