import React, { useEffect, useState } from 'react'
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { Home, ShoppingBag, ChevronDown,
Menu, User, Truck,LogOut, Send, XCircle, Shield } from 'react-feather';
import { useDispatch} from 'react-redux';
import { logoutAdminUser} from '../../store/slices/userSlice';


const Sidebar = ({ children }) => {
	let navigate = useNavigate();
	const [user, setUser] = useState()
	const [profile, setProfile] = useState(false)
	const [showSideBar, setShowSideBar] = useState(false)
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
		{
			icon: <Shield className="mr-2" size={16} />,
			name: 'Admins',
			path: '/admin/admin',
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

	async function getUser(){
	const currentUser = JSON.parse(localStorage.getItem("admin_user"))
    setUser(currentUser.data.user)
	}

	useEffect(() => {
    getUser()
	},[])

	const dispatch = useDispatch()

	async function logout(){
		dispatch(logoutAdminUser())
		navigate("/admin/login")
	}

  return (
    <div className='flex relative'>
           
 {/* SideBar */}
 <div className={`${showSideBar ? 'sidebar-left-margin' : 'sidebar-right-margin '} 
 w-[250px]  bg-[#8633E0] h-screen`}> 
 {/* Logo */}
   <div className='flex pl-5 h-[70px] items-center justify-center border-b-2  border-b-[#fff]'>
	  <p className='text-[25px] mt-3 text-[#fff] font-[600]'>TECH SHOP</p>
   </div>
   {/* SideBar Nav */}
   <div className='mt-8 hover:text-[#000] text-[#fff]'>
	  {
		  menu.map((item, idx) => {
			  return (
			  <div key={idx + 1}  className=' px-5 py-3 pl-5 text-[18px] hover:bg-[#fff] hover:text-[#000]'>
			  <NavLink to={item.path} className="flex items-center hover:text-[#000]  text-[#fff] no-underline text-[20px]">
			  <span>{item.icon}</span> <span>{item.name}</span> 
			  </NavLink>
			  </div>
			  )
		  })
	  }
   </div>
</div> 
<div className='w-screen relative'>
<div className='h-[70px] bg-[#8633E0] text-[#fff] flex items-center justify-between px-[35px]'>
	<div>
	 <button onClick={() => setShowSideBar(!showSideBar)}><Menu className="mr-2" size={28} /></button>	
		</div>
		<div className='w-[180px]'> 
		{
			user
			     ? 
				<div className=''>
				<div onClick={() => setProfile(!profile)}  className='flex cursor-pointer items-center justify-center'>
                 <img className='w-[40px] mt-2 h-[40px] object-cover rounded-full' src={`http://localhost:5000/${user.avatar}`} alt="" />
				 <p className='mt-[20px] w-[70px] mx-2'>Hi, {user.username}</p>
				 <div className='w-[20px] mb-1 mt-[10px]'><ChevronDown size={16}/></div>
				</div>

				{/* PROFILE */}
				{profile && (
                   <div className='z-50 bg-[#fff] absolute w-[220px] rounded-[10px] shadow right-10 py-3 px-2 top-[80px] text-[#8633E0]'>
				   <div className='flex items-center justify-between'>
					   <p className='text-[20px]'>User Profile</p>
					   <p onClick={() => setProfile(false)}><XCircle className="mr-2 cursor-pointer" size={20} /></p>
				   </div>
				   <div className='flex items-center justify-between'>
				   <img className='w-[80px] h-[80px] object-cover rounded-full' src={`http://localhost:5000/${user.avatar}`} alt="" />
					   <div className='mt-[10px]'>
						   <p>{user.username}</p>
						   <p>{(user.roles[user.roles.length - 1]).toUpperCase()}</p>
					   </div>
				   </div>
				   <button
				   onClick={logout}
                className='p-[7px] text-[#fff] w-full border-1 mt-3 bg-[#5C3EBA] 
				flex items-center text-center justify-center rounded-[6px]'>
                <span className='mr-[5px] '><LogOut size={16}/></span> <span> Logout </span> 
                </button>
				</div>
				)}
                 
	        	</div>
			     : 
				<div className='flex justify-end'>
					<button><User className="mr-2" size={28} /></button>			
				</div>
		}	
		 </div>
</div> 
<div className='relative'> 
{children}
</div>
</div>
</div>
  )
}

export default Sidebar

