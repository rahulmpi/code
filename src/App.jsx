import './App.css'
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom'
import Home from './pages/index'
import Products from './pages/Products'
import SingleProduct from './pages/SingleProduct'
import Cart from './pages/Cart'
import { ThemeProvider } from 'styled-components'
import {GlobalStyle} from './GlobalStyle'
import Layout from './components/Layout'
import SimpleLayout from './components/SimpleLayout'
import { useEffect, useState } from 'react'
import { getProducts } from './store/slices/AppSlice'
import { useDispatch, useSelector } from "react-redux";
import { loadFilterProducts } from './store/slices/FilterSlice'
import Checkout from './pages/Checkout'
import Success from './pages/Success'
import Signup from './pages/Singup'
import SignIn from './pages/SignIn'

function App() {

  const dispatch = useDispatch()
  const {products} = useSelector((state) => state.App)


  const theme = {
    colors: {
      heading: "rgb(24 24 29)",
      text: "rgba(29 ,29, 29, .8)",
      white: "#fff",
      black: " #212529",
      helper: "#3b49cb",

      bg: "#F6F8FA",
      footer_bg: "#0a1435",
      btn: "rgb(98 84 243)",
      border: "rgba(98, 84, 243, 0.5)",
      hr: "#ffffff",
      gradient:
        "linear-gradient(0deg, rgb(132 144 255) 0%, rgb(98 189 252) 100%)",
      shadow:
        "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px,rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;",
      shadowSupport: " rgba(0, 0, 0, 0.16) 0px 1px 4px",
    },
    media: {
      mobile: "768px",
      tab: "998px",
    },
  };

  useEffect(() =>{
      dispatch(getProducts())
  },[])
  useEffect(() =>{
    dispatch(loadFilterProducts(products))
  }, [products])


  const router = createBrowserRouter([
    {
      path: '/',
      element: <SimpleLayout/>,
      children: [
        {
          path: '/',
          element: <Home/>
        },
        {
          path: '/products',
          element: <Products/>
        },
        {
          path: '/product/:id',
          element: <SingleProduct/>
        },
        {
          path: '/cart',
          element: <Cart/>
        },
        {
          path: '/checkout',
          element: <Checkout/>
        },
        {
          path: '/success',
          element: <Success/>
        },
      ]
    },
    {
    path: '/',
    element: <Layout/>,
    children: [
      {
        path: '/signup',
        element: <Signup/>
      },
      {
        path: '/login',
        element: <SignIn/>
      },
    ]
  }
    
  ])

  return (
    <>
    <ThemeProvider theme={theme}>
      <GlobalStyle/>
      <RouterProvider router={router}></RouterProvider>
    </ThemeProvider>
    </>
  )
}

export default App
