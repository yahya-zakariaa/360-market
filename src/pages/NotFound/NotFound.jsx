import React from 'react'
import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <section className='w-full h-screen flex justify-center items-center'>
      <h1 className='text-2xl text-black'>Not Found <Link to={"/"} className='text-black font-bold underline'>Back to Home</Link></h1>
    </section>
  )
}
