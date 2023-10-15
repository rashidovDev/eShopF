import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from './components/Admin/Home'
import Order from './components/Admin/Orders/Order'
import { AdminPrivateRoute } from './components/Admin/private'
import User from './components/Admin/Users/User'
import Product from "./components/Admin/Products/Product"
import Login from "./Login"

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Oval } from 'react-loader-spinner'
import { useSelector } from 'react-redux'

const App = () => {

  const loader = useSelector(state => state.loader.loader)
  return (
    <>
      <ToastContainer
        position="bottom-left"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
      />
      {loader &&
        <div className='loader'>
          <Oval
            height={70}
            width={70}
            color="#5C3EBA"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
            ariaLabel='oval-loading'
            secondaryColor="#5C3EBA"
            strokeWidth={2}
            strokeWidthSecondary={2}
          />
        </div>
      }

      <BrowserRouter>
        <Routes>
          <Route path='/admin/login' element={<Login />} />
          <Route path="/admin/:path?/*" element={<AdminPrivateRoute />}>
            <Route path='main' element={<Home />} />
            <Route path='order' element={<Order />} />
            <Route path='product' element={<Product />} />
            <Route path='user' element={<User />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App