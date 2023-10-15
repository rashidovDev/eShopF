import React, { useState } from 'react'
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { Home, Briefcase,ShoppingBag, Folder, Book, Coffee, ChevronRight, ChevronDown,
Bookmark, Menu, User, Truck, Edit, Settings, LogOut, Send } from 'react-feather';
import { Image } from 'react-bootstrap';
import Order from './Orders/Order';

const Sidebar = ({ children }) => {
	console.log({children})
    const location = useLocation();
	let navigate = useNavigate();
	const [showSideBar, setShowSideBar] = useState(false)
	console.log(showSideBar)
	const [showSettings, setShowSettings] = useState(false)
    const [menu, setMenu] = useState([
		{
			icon: <Home className="mr-2" size={16} />,
			name: 'Dashboard',
			path: '/admin/main',
			show: false,
			children: []
		},
		{
			icon: <Truck className="mr-2" size={16} />,
			name: 'Orders',
			path: '/admin/order',
			show: false,
			children: [],
			breadrcumb: [
				{
					name: 'Create new order',
					path: '/admin/order/create'
				},
				{
					name: 'Update order',
					path: '/admin/order/update/'
				},
			]
		},
		{
			icon: <ShoppingBag className="mr-2" size={16} />,
			name: 'Products',
			path: '/admin/product',
			show: false,
			children: [],
			breadrcumb: [
				{
					name: 'Create new Product',
					path: '/admin/product/create'
				},
				{
					name: 'Update Product',
					path: '/admin/product/update/'
				},
			]
		},
		{
			icon: <User className="mr-2" size={16} />,
			name: 'Users',
			path: '/admin/user',
			show: false,
			children: [],
			breadrcumb: [
				{
					name: 'Create new Product',
					path: '/admin/product/create'
				},
				{
					name: 'Update Product',
					path: '/admin/product/update/'
				},
			]
		},
	])
  return (
    <div className='flex relative'>
           
 {/* SideBar */}
 <div className={`${showSideBar ? 'sidebar-left-margin' : 'sidebar-right-margin '} 
 w-[300px]  bg-[#5C3EBA] h-screen`}> 
 {/* Logo */}
   <div className='flex pl-5 items-center border-b-2  border-b-[#E8BC25]'>
	  <img src={require("../../assets/logSidebar.png")} width={70} alt="" />
	  <p  className='text-[25px] text-[#E8BC25] ml-4'>AR_Shop</p>
   </div>
   {/* SideBar Nav */}
   <div className='mt-8 pl-5 text-[#fff]'>
	  {
		  menu.map((item, idx) => {
			  return (
			  <div key={idx + 1}  className=' px-5 py-5 pl-5 text-[18px] hover:bg-[#fff] hover:text-[#000]'>
			  <NavLink to={item.path} className="flex items-center">
			  <span>{item.icon}</span> <span>{item.name}</span> 
			  </NavLink>
			  </div>
			  )
		  })
	  }
   </div>
</div> 
<div className='w-screen'>
<div className='h-[75px] bg-[#5C3EBA] text-[#fff] flex items-center justify-between px-5'>
	<div>
	 <button onClick={() => setShowSideBar(!showSideBar)}><Menu className="mr-2" size={28} /></button>	
		</div>
		<button onClick={() => setShowSideBar(!showSideBar)}><User className="mr-2" size={28} /></button>	
</div> 
<div>{children}</div>
</div>
   
</div>
  )
}

export default Sidebar

