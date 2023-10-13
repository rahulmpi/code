import React from 'react'
import Header from './Header'
import { Outlet } from 'react-router-dom'

const SimpleLayout = () => {
  return (
    <>
     <Header />
     <Outlet/>
    </>
  )
}

export default SimpleLayout