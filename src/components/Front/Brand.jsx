import React from 'react'

const Brand = () => {
  return (
    <div className='md:w-[80%] py-[15px] m-auto text-[#8633E0]'>
    <h1 className='text-center p-1'>Brands</h1>
    <div className='flex items-center justify-center'>
    <img className='w-[160px] p-3'  src={require("../../assets/brands/apple.png")} alt="apple" />
    <img className='w-[160px] p-3'  src={require("../../assets/brands/acer.png")} alt="apple" />
    <img className='w-[120px] p-3'  src={require("../../assets/brands/hp.png")} alt="apple" />
    <img className='w-[160px] p-3'  src={require("../../assets/brands/redmi.png")} alt="apple" />
    <img className='w-[160px] p-3'  src={require("../../assets/brands/lenovo.png")} alt="apple" />
    <img className='w-[160px] p-3'  src={require("../../assets/brands/samsung1.png")} alt="apple" />
    <img className='w-[160px] p-3'  src={require("../../assets/brands/xiaomi.png")} alt="apple" />
    </div>
    </div>
  )
}

export default Brand