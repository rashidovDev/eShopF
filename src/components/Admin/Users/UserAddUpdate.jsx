import React, { useEffect, useState } from 'react'
import { FILE, GET, POST } from '../../../api/adminApi'
import {XCircle, Save, Edit, User} from 'react-feather';
import { Link, Navigate, NavLink, useNavigate, useParams } from 'react-router-dom';
import { useForm } from "react-hook-form";
import Modal from "../../Modal/Modal"
import { useDispatch, useSelector } from 'react-redux'
import { showModal } from '../../../store/slices/modalSlice';
import { getId } from '../../../store/slices/idSlice';
import { BiUserCircle } from 'react-icons/bi';
import { FaUserCircle } from 'react-icons/fa';



const UserAddUpdate = () => {
  const {id} = useParams()
  const [file, setFile] = useState(null)

  const navigate = useNavigate()

  const userId = useSelector(state => state.id.id?.payload)
  console.log(userId)
  const dispatch = useDispatch()

  const { register, handleSubmit, formState: { errors } } = useForm();

  const [country, setCountry] = useState([])

  async function getCountries() {
      const response = await GET('/countries')
      setCountry(response)
  }

  async function createUser(data){
    const response = await POST("/auth/registration", data)
    console.log(response)
    dispatch(getId(response.id))
  }

  async function getUser(){
    const response = await GET(`/auth/users/${id}`)
    console.log(response)
  }

  async function fileUpload(){
      await FILE(`/auth/avatar/${userId}`, file)
      navigate("/admin/user")
  }

  async function getData() {
    await getCountries()
    await getUser()
  }

  useEffect(() => {
      getData()
  },[])

  return (
    <>
    <Modal>
    <div className='p-3'>
    <p className='text-center'>Upload picture</p>
    <input onChange={(e) => setFile(e.target.files[0])} type="file" accept=".jpg,.jpeg,.png" className='border ml-1 border-sky-500 p-2 w-[300px] outline-[#5C3EBA]'/>
    <button className='p-[8px] ml-4 rounded-[6px] text-[#fff] bg-[#5C3EBA]' onClick={fileUpload}>upload</button>
    </div>
    
    </Modal>

    <div className='h-[650px] px-16 relative'>
       
      <div className='flex items-center h-[600px] justify-items-center'>
        <div className='w-1/2 ml-16'>
              <div>
            <form autoComplete='off' method="POST" onSubmit={handleSubmit(createUser)} action="">
            <div className = "my-[40px]">
              <label htmlFor="name" className='w-[70px] ml-2'>Username</label>
              <input autoComplete="off" {...register("username", { required: true, minLength: 4 })} id='name' type="text" placeholder='Name' 
              className='border ml-1 border-sky-500 p-2 w-[300px] outline-[#5C3EBA]'/>
              {errors.username?.type === 'required' && <div className='text-danger mt-2'>Обязательное поле</div>}
              {errors.username?.type === 'minLength' && <div className='text-danger mt-2'>Поле должно быть не менее 4 символов</div>}
            </div>
            <div className = "my-[40px]">
              <label htmlFor="email" className='w-[70px] ml-2'>Email</label>
              <input autoComplete="false" {...register("email", { required: true})} id='email' type="text" placeholder='Email' 
              className='border ml-1 border-sky-500 p-2 w-[300px] outline-[#5C3EBA]'/>
                {errors.email?.type === 'required' && <div className='text-danger mt-2'>Обязательное поле</div>}
            </div>
            <div className = "my-[40px]">
              <label htmlFor="password" className='w-[70px] ml-2'>Password</label>
              <input autoComplete="false" {...register("password", { required: true})} id='name' type="text" placeholder='Name' 
              className='border ml-1 border-sky-500 p-2 w-[300px] outline-[#5C3EBA]'/>
            </div>
             <div className = "my-[40px]">
              <label htmlFor="country" className='w-[70px] ml-2'>Country</label>
              <select {...register("country", { required: true})}  id="country" name="country" className='border ml-1 border-sky-500 p-2 w-[300px] outline-[#5C3EBA]'>
            {country.map( (cnt, idx) => {
              return(
                <option key={idx + 1} value={cnt.name}>{cnt.name}</option>
              )
            })}
        </select>
            </div> 
            <div className='absolute bottom-0 md:left-[135px] flex text-[#fff]  text-[19px]'>  
                <Link to="/admin/user" className='no-underline text-[#fff]'>
                <button className='mr-5 p-[6px] underline-none w-[130px] flex items-center text-center justify-center rounded-[6px] bg-[red]'>
                <span className='mr-[5px] mt-[2px]'><XCircle size={16}/></span> <span>Cancel</span> 
                </button>
                </Link>
                 <button className='p-[6px] w-[130px] flex items-center text-center justify-center  rounded-[6px] bg-[#5C3EBA]'>
                <span className='mr-[5px] mt-[2px]'><Save size={16}/></span> <span>Save</span> 
                </button>
      </div>
            </form>
            </div>
        </div>
        <div className='w-1/2'>
            <div className='md:ml-16 flex-column'>
                
                {/* <img className='rounded-full mb-3' src={require("../../../assets/avatar.jpg")} alt="" /> */}
                <FaUserCircle  className='text-[170px] ml-[35px] my-2'/>
                <button 
                onClick={() => {
                  dispatch(showModal())
                } }
                className='p-[7px] md:ml-[58px] text-[#fff] flex items-center text-center justify-center rounded-[6px] bg-[#5C3EBA]'>
                <span className='mr-[5px] '><Edit size={16}/></span> <span>{id ? "Edit picture" : "Add picture"} </span> 
                </button>
            </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default UserAddUpdate
