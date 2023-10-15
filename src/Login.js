import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { login } from './api/adminApi'

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [emailDirty, setEmailDirty] = useState(false)
    const [passwordDirty, setPasswordDirty] = useState(false)
    const [emailError, setEmailError] = useState('Required field')
    const [passwordError, setPasswordError] = useState('Required field')
    const [formValid, setFormValid] = useState(false)

    useEffect(() => {
        if(emailError || passwordError){
             setFormValid(false)
        }else{
            setFormValid(true)
        }
    }, [emailError, passwordError])

    const emailHandler = (e) => {
    setEmail(e.target.value)
    const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if(!re.test(String(e.target.value).toLowerCase())) {
        setEmailError("Incorrect email")
    } else{
        setEmailError("")
    }
    }

    const passwordHandler = (e) => {
        setPassword(e.target.value)
        if(e.target.value.length < 4 || e.target.value.length > 12){
          setPasswordError("Password must be longer than 3 and smaller than 12")
          if(!e.target.value){
            setPasswordError("Required field")
          }else{
            setPasswordError('')
          }
        }
    }
    
const blurHandler = (e) => {
    switch(e.target.name){
        case 'email' : 
        setEmailDirty(true)
        break
        case 'password' : 
        setPasswordDirty(true)
        break
        default : 
    }
}

    const dispatch = useDispatch()
   
    return (
        <div>
            <div className='text-[#262134] w-full min-h-screen flex'>
                <div className='w-1/2 bg-[#5C3EBA] flex items-center justify-center'>
                    <img src={require("./assets/log.png")} alt="" />
                </div>
                <div className="w-1/2 items-center">
                    <div className=' justify-center w-2/3 items-center md:mt-[280px] ml-20'> 
                          <form>
                          <h1 className=' text-[35px] font-[350] mb-5'>Log In</h1>
                          <input name='email' onChange={e => emailHandler(e)} onBlur={e => blurHandler(e)} value={email}  autoComplete='off' type="email" placeholder='Email' 
                            className="w-full p-2 mb-4 focus:border-b-[#5C3EBA]  border-[#000] ff mt-2 " />
                            {(emailDirty && emailError) && <div>{emailError}  </div>}
                            <input name='password' onChange={e => passwordHandler(e)} onBlur={e => blurHandler(e)} value={password}  autoComplete='off' type="password" 
                            placeholder='Password' className="w-full p-2 my-2 outline-none border-[#000] ff mt-2 " />
                            {(passwordError && passwordDirty) && <div>{passwordError}</div>} 
                            <button disabled={!formValid} onClick={() => dispatch(login(email, password))}
                          className='border p-[3px] w-full rounded-[4px] my-4 border-[#5C3EBA] flex justify-center items-center'><span className='mr-2'>Log In</span> <span className='mt-[3px]'><img src={require("./assets/coolicon.png")} alt="" /></span> </button>
                          </form>
                           
                    </div>
                    wfjk
                </div>
            </div>
        </div>
    )
}

export default Login