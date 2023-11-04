import React from 'react'
import Brand from './Brand'
import Products from './Products'

const Header = () => {
  return (
    <>
     <div  className='bg-[#F6F7F9] pt-[70px]'>
        <div className='md:w-[80%] m-auto flex items-center justify-between text-[#8633E0]'>
        <div>
        <div className='mb-4'>
            <h4 className='mb-4'>New Release</h4>
            <h1>New Iphones on sale</h1>
        </div>
        <div className='flex items-center justify-between '>
            <button className='text-[22px]'>From 1099$</button>
            <button className='p-3 w-[160px]  rounded-[10px] hover:text-[#fff]
             text-[#8633E0] text-[16px] border-2 border-[#8633E0]  hover:bg-[#8633E0] text-[#8633E0]'>SHOP NOW</button>
        </div>
        </div>
        <div>
            <img className='w-[550px]' src={require("../../assets/15pro.png")} alt="" />    
        </div>
        </div>
    </div>
    <Brand/>
    <Products/>
    </>
  )
}

export default Header