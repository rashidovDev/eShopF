import React from 'react'
import { ShoppingBag, User } from 'react-feather'
import { Outlet, Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className='bg-[#8633E0] fixed z-40 w-screen top-0'>
         <div className='md:w-[80%]  py-[15px] m-auto flex items-center justify-between text-[#fff]'>
          <h1>Tech Shop</h1>
          <div className='no-underline ml-[100px] text-[20px] text-[#fff]'>
            <Link className='p-2 text-[#fff] no-underline' to="">Home</Link>
            <Link className='p-2 no-underline text-[#fff]'  to="">Products</Link>
            <Link className='p-2 no-underline text-[#fff]' to="/about">About Us</Link>
            <Link className='p-2 no-underline text-[#fff]' to="">Contact</Link>
          </div>
          <div>
          </div>
          <div className='flex items-center text-[20px] justify-center'>
          <Link className='p-2 text-[#fff] no-underline' to="/user/login">Sign In</Link>
            <Link className='p-2 no-underline text-[#fff]'  to="/user/signup">Sign Up</Link>
          </div>
           {/* <div className='flex items-center justify-between'>
            <button className='flex items-center '>
            <User className='mr-1'/>
            </button>
            <button className='flex items-center ml-5'>
            <ShoppingBag className='mr-1'/>
            </button>
           </div> */}
         </div>
    </nav>
  )
}

export default Navbar