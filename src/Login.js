import React from 'react'

const Login = () => {
    return (
        <div>
            <div className='text-[#262134] w-full min-h-screen flex'>
                <div className='w-1/2 bg-[#5C3EBA] flex items-center justify-center'> 
                     <img src={require("../../assets/logo.png")} alt="" />
                </div>
                <div className="w-1/2 items-center">
                    <div className=' justify-center w-2/3 mt-60 ml-20'>
                        <h1 className=' text-[35px] font-[350] mb-5'>Log In</h1>
                        <form autoComplete="off" action="">
                            <input autoComplete='off' type="text" placeholder='Username' className="w-full p-2 mb-4 focus:border-b-[#5C3EBA]  border-[#000] ff mt-2 " />
                            <input autoComplete='off' type="password" placeholder='Password' className="w-full p-2 my-2 outline-none border-[#000] ff mt-2 " />
                            <button className='border p-[3px] w-full rounded-[4px] my-4 border-[#5C3EBA] flex justify-center items-center'><span className='mr-2'>Log In</span> <span className='mt-[3px]'><img src={require("../../assets/coolicon.png")} alt="" /></span> </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login