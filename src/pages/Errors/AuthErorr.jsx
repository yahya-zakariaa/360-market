import React from 'react'
import { Link } from 'react-router-dom'

export default function AuthErorr() {
  return (
    <div className='login-error w-full h-screen flex items-center justify-center flex-col gap-10 '>
        <h3 className='text-center font-bold text-[30px]'>Please login first !</h3>
        <Link to={'/login'} className="bg-black px-8 text-[20px] py-2 rounded-md text-white">Login</Link>
    </div>
  )
}
