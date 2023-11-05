import React, { useEffect, useState } from 'react'
import { LogOut, ShoppingBag, User, XCircle } from 'react-feather'
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, Link, useNavigate, NavLink } from "react-router-dom";
import { logoutUser } from '../../store/slices/userSlice';
import { showBasket } from '../../store/slices/basketSlice';

const Navbar = () => {

  const navigate = useNavigate()
  const [user, setUser] = useState()
  const [isUser, setIsUser] = useState(false)
  const [profile, setProfile] = useState(false)

  const totalQuantity = useSelector(state => state.basket.totalQuantity)

  async function getUser(){
    const currentUser = JSON.parse(localStorage.getItem("user"))
    if(currentUser){
      setUser(currentUser.data.user)
      setIsUser(true)
    }
    }
	useEffect(() => {
    getUser()
	},[])

	const dispatch = useDispatch()

  async function logout(){
		dispatch(logoutUser())
		navigate("/")
	}

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
          {user ? (
            <div className='flex items-center justify-between'>
            <button onClick={() => setProfile(true)} className='flex items-center '>
            <User className='mr-1'/>
            </button>
            <div className='relative'>
            <button  onClick={() => dispatch(showBasket())} className='flex items-center ml-5'>
            <ShoppingBag className='mr-1'/>
            {
              totalQuantity > 0 &&  <div className='bg-[#fff] rounded-full w-[15px] top-[-4px] right-[-4px]
              font-[700] h-[15px] text-[12px] absolute text-[#8633E0]'>{totalQuantity}
             </div>
            }
            </button>
            </div>
           
             {/* PROFILE */}
			      {profile && (
            <div className='z-50 bg-[#fff] absolute w-[170px] rounded-[10px] shadow right-10 py-3 px-2 top-[80px] text-[#8633E0]'>
				   <div className='flex items-center justify-between'>
					   <p className='text-[20px]'>User Profile</p>
					   <p onClick={() => setProfile(false)}><XCircle className="mr-2 cursor-pointer" size={20} /></p>
				   </div>
				   <div className='flex items-center justify-between'>
				   <img className='w-[80px] h-[80px] object-cover rounded-full' src={`http://localhost:5000/${user.avatar}`} alt="" />
					   <div className='mt-[10px]'>
						   <p className='ml-2'>{user.username}</p>
					   </div>
				      </div>
            <div className='flex flex-col justify-center mt-3  text-[18px]'>
            <Link  className='text-[#8633E0] no-underline' to="/user/profile">Profile</Link>
             <Link className='text-[#8633E0] no-underline' to="/user/order">Orders</Link>
            </div>
             
				     <button
				     onClick={() => {
              setProfile(false)
              setIsUser(false)
              logout()
             } }
                className='p-[7px] text-[#fff] w-full border-1 mt-3 bg-[#5C3EBA] 
				     flex items-center text-center justify-center rounded-[6px]'>
                <span className='mr-[5px] '><LogOut size={16}/></span> <span> Logout </span> 
                </button>
				</div>
				)}
           </div>
          )
           
          : !isUser && 
            <div className='flex items-center text-[20px] justify-center'>
            <Link className='p-2 text-[#fff] no-underline' to="/user/login">Sign In</Link>
              <Link className='p-2 no-underline text-[#fff]'  to="/user/signup">Sign Up</Link>
              <button onClick={() => dispatch(showBasket())} className='flex items-center ml-5'>
            <ShoppingBag className='mr-1'/>
            {
              totalQuantity > 0 &&  <div className='bg-[#fff] rounded-full w-[15px] top-[-4px] right-[-4px]
              font-[700] h-[15px] text-[12px] absolute text-[#8633E0]'>{totalQuantity}
             </div>
            }
            </button>
              
            </div>
          }
          
          
          
         </div>
    </nav>
  )
}

export default Navbar