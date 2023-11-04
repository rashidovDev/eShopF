import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Eye, EyeOff } from 'react-feather';
import axios from "axios"
import { useNavigate } from 'react-router-dom';
import { login } from './api/adminApi'
import { setUser } from './store/slices/userSlice';

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [visible, setVisible] = useState(false)
    const [emailDirty, setEmailDirty] = useState(false)
    const [passwordDirty, setPasswordDirty] = useState(false)
    const [emailError, setEmailError] = useState('Required field')
    const [passwordError, setPasswordError] = useState('Required field')
    const [formValid, setFormValid] = useState(false)

    const baseURL = "http://localhost:5000/api"
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const authLogin = async (email, password) => {
       try{
        const response = await login(email, password) 
        if(response){
             const data = await axios.get(baseURL + '/auth',
             { headers: { Authorization: 'Bearer ' + response.data.token }})
             dispatch(setUser(data.data.user))
             for (let i = 0; i < data.data.user.roles.length; i++) {
                 if (data.data.user.roles[i] === "admin" || data.data.user.roles[i] === "owner") {
                     localStorage.setItem('admin_access_token', response.data.token)
                     localStorage.setItem("admin_tokenTime", JSON.stringify(new Date().getTime()))
                     localStorage.setItem('admin_user', JSON.stringify(data))
                     navigate("/admin/main")
                 }else if(data.data.user.roles[i] === "user"){
                    navigate("/")
                 }else {
                    navigate("/")
                 }
             }  
        }
       }catch(err){
       alert(err.data.data.message)
       }
    }


    // Login validation 

    useEffect(() => {
        if (emailError || passwordError) {
            setFormValid(false)
        } else {
            setFormValid(true)
        }
    }, [emailError, passwordError])

    const emailHandler = (e) => {
        setEmail(e.target.value)
        const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        if (!e.target.value) {
            setEmailError("Required field")
        }
        else if (!re.test(String(e.target.value).toLowerCase())) {
            setEmailError("Incorrect email")
        }
        else {
            setEmailError("")
        }
    }

    const passwordHandler = (e) => {
        setPassword(e.target.value)
        if (!e.target.value) {
            setPasswordError("Required field")
        }
        else if (e.target.value.length < 4 || e.target.value.length > 12) {
            setPasswordError("Password must be longer than 3 and smaller than 12")
        }
        else {
            setPasswordError('')
        }
    }

    const blurHandler = (e) => {
        switch (e.target.name) {
            case 'email':
                setEmailDirty(true)
                break
            case 'password':
                setPasswordDirty(true)
                break
            default:
        }
    }

    return (
        <div>
            <div className='text-[#262134] w-full min-h-screen flex'>
                <div className='w-1/2 bg-[#5C3EBA] flex items-center justify-center'>
                    <img src={require("./assets/log.png")} alt="" />
                </div>
                <div className="w-1/2 items-center">
                    <div className=' justify-center w-2/3 items-center md:mt-[280px] ml-20 relative'>
                        <h1 className=' text-[35px] font-[350] mb-5'>Log In</h1>
                        <input name='email' onChange={e => emailHandler(e)} onBlur={e => blurHandler(e)} value={email} autoComplete='off' type="email" placeholder='Email'
                            className="w-full p-2 mb-4 focus:border-b-[#5C3EBA]  border-[#000] ff mt-2 " />
                        {(emailDirty && emailError) && <div className='text-[red]'>{emailError}  </div>}
                        <input name='password' onChange={e => passwordHandler(e)} onBlur={e => blurHandler(e)} value={password} autoComplete='off' type={visible ? "text" : "password"}
                            placeholder='Password' className="w-full p-2 my-2 outline-none border-[#000] ff mt-2 " />
                        {(passwordError && passwordDirty) && <div className='text-[red]'>{passwordError}</div>}
                        <button disabled={!formValid} onClick={() => authLogin(email, password)}
                            className='border p-[3px] w-full rounded-[4px] my-4 border-[#5C3EBA] flex justify-center items-center'><span className='mr-2'>Log In</span> <span className='mt-[3px]'><img src={require("./assets/coolicon.png")} alt="" /></span> </button>
                        <div onClick={() => setVisible(!visible)} className='absolute right-2  bottom-[68px] cursor-pointer'>{visible ? <EyeOff className="mr-2" size={18} /> : <Eye className="mr-2" size={18} />} </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login