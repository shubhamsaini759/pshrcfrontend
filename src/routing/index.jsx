import React from 'react'
import {  Route, Routes } from 'react-router-dom'
import Login from '../pages/Login'

import Admin from '../pages/Admin'
import AdminDash from '../components/admin/adminDash'
import CreateSup from '../components/admin/adminDash/CreateSup'
import CaseDetails from '../components/admin/adminDash/CaseDetails'
import CaseEdit from '../components/admin/adminDash/CaseEdit'
import SupdtList from '../components/admin/adminDash/SupdtList'
import SupdtDetails from '../components/admin/adminDash/SupdtDetails'
import User from '../pages/User'
import UserDash from '../components/user/userDash'
import CreateCase from '../components/user/userDash/CreateCase'
import EditCase from '../components/user/userDash/EditCase'
import ReportDetails from '../components/user/userDash/ReportDetails'
import ProtectedRoutes from './ProtectedRoutes'
import Cancel from '../Payment/Cancel'
import Succcess from '../Payment/Succcess'
import Home from '../Payment/Home'

const Routing = () => {
  return (
    <Routes>
      <Route path='/' element={<Home /> } />

      <Route path='/cancel' element={<Cancel /> } />
      <Route path='/success' element={<Succcess /> } />

      
      {/* <Route path='/' element={<Login /> } />


      <Route path='/' element={ <Admin /> } >
        <Route path='/dashboard' element={ <ProtectedRoutes Component={AdminDash} /> }  />
        <Route path='/createsup' element={  <ProtectedRoutes Component={CreateSup} /> } />
        <Route path='/casedetails' element={ <ProtectedRoutes Component={CaseDetails} /> } />
        <Route path='/caseedit' element={  <ProtectedRoutes Component={CaseEdit} /> } />
        <Route path='/supdtlist' element={  <ProtectedRoutes Component={SupdtList} /> } />
        <Route path='/supdtdetails' element={ <ProtectedRoutes Component={SupdtDetails} /> } />
      </Route>

      <Route path='/' element={ <User /> } >
        <Route path='/home' element={ <ProtectedRoutes Component={UserDash} /> } />
        <Route path='/createcase' element={ <ProtectedRoutes Component={CreateCase} /> } />
        <Route path='/editcase' element={ <ProtectedRoutes Component={EditCase} /> } />
        <Route path='/report' element={  <ProtectedRoutes Component={ReportDetails} /> } />
      </Route> */}



    </Routes>
  )
}

export default Routing