import React, { useEffect } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from './components/Admin/Home'
import Order from './components/Admin/Orders/Order'
import { AdminPrivateRoute, OwnerPrivateRoute, NavbarRoute } from './components/Admin/private'
import Admin from './components/Admin/Admins/Admin'
import AdminAddUpdate from './components/Admin/Admins/AdminAddUpdate'
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
import Navbar from './components/Front/Navbar'
import Header from './components/Front/Header'
import Brand from './components/Front/Brand'
import About from './components/Front/About'

import { useLocation } from 'react-router-dom';
import Footer from './components/Front/Footer'
import Registration from './components/Front/Registration'

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



    {/* FRONT */}
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Navbar />
              <Header />
              <Footer />
            </>
          }
        />
        <Route path='/user/login' element={<Login />} />
        <Route path='/user/signup' element={<Registration />} />
        <Route path='/about' element={<About />} />
      </Routes>
      <Routes>



        {/* ADMIN */}
        <Route path='/admin/login' element={<Login />} />
        <Route path="/admin/" element={<AdminPrivateRoute />}>
          <Route path='main' exact element={<Home />} />
          <Route path='order' exact element={<Order />} />
          <Route path='product' exact element={<Product />} />
          <Route path='user' exact element={<User />} />
          <Route path='admin' exact element={<Admin />} />

          <Route path="/admin/" element={<OwnerPrivateRoute />}>
            <Route path='admin/create' exact element={<AdminAddUpdate />} />
          </Route>

          <Route path='user/create' exact element={<UserAddUpdate />} />
          <Route path='product/create' exact element={<ProductAddUpdate />} />

          <Route path='admin/update/:id' exact element={<UserAddUpdate />} />
          <Route path='user/update/:id' exact element={<UserAddUpdate />} />
          <Route path='product/update/:id' exact element={<ProductAddUpdate />} />
        </Route>
      </Routes>
    </>
  )
}

export default App