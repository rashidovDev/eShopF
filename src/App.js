import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from './components/Admin/Home'
import Order from './components/Admin/Orders/Order'
import { AdminPrivateRoute } from './components/Admin/private'
import User from './components/Admin/Users/User'
import UserAddUpdate from './components/Admin/Users/UserAddUpdate'
import Product from "./components/Admin/Products/Product"
import ProductAddUpdate from "./components/Admin/Products/ProductAddUpdate"
import Login from "./Login"

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Oval } from 'react-loader-spinner'
import { useSelector } from 'react-redux'
import Modal from './components/Modal/Modal'

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
        <div className='loader z-40'>
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
          <Route path="/admin/" element={<AdminPrivateRoute />}>
            <Route path='main' exact element={<Home />} />
            <Route path='order' exact element={<Order />} />
            <Route path='product' exact element={<Product />} />
            <Route path='user' exact element={<User />} />

            <Route path='user/create' exact element={<UserAddUpdate/>} />
            <Route path='product/create' exact element={<ProductAddUpdate/>} />

            <Route path='user/update/:id' exact element={<UserAddUpdate/>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App