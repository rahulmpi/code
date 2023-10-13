import React, {useEffect} from 'react'
import Header from './Header'
import { Outlet } from 'react-router-dom'
import { Navigate } from 'react-router-dom'

const Layout = () => {
  if(localStorage.getItem('token')){
    return <Navigate to="/"/>
  }
  return (
    <>
     <Header />
     <Outlet/>
    </>
  )
}

export default Layout