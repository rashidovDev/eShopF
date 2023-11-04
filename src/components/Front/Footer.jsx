import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className='bg-[#8633E0]'>
        <div className='md:w-[80%] py-[35px] m-auto flex items-center justify-between'>
        <div className='no-underline text-[20px] text-[#fff]'>
            <Link className='px-2 text-[#fff] no-underline' to="">Home</Link>
            <Link className='px-2 no-underline text-[#fff]'  to="">Products</Link>
            <Link className='px-2 no-underline text-[#fff]' to="/about">About Us</Link>
            <Link className='px-2 no-underline text-[#fff]' to="">Contact</Link>
          </div>
           <div>
           <Link className='text-[25px] text-[#fff] no-underline' to="">TECH SHOP</Link>
           </div>
           <div className='text-[#fff] pt-[14px]'>
           <p>Copyright © 2023 TECH SHOP</p> 
           </div>
        </div>
    </footer>
  )
}

export default Footer