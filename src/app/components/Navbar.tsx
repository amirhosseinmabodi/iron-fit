"use client"
import Link from 'next/link'
import React from 'react'
import { getCookie } from 'cookies-next';

function Navbar() {
  const uid = getCookie("UID");
  console.log(uid);
  
  return (
    <div className='px-7 flex justify-around items-center mx-auto shadow h-16'>
      <h1 className='text-orange-500 font-bold uppercase text-2xl'>ironfit</h1>
      <div className='flex gap-4 text-center capitalize'>
        <Link  className='hover:text-orange-500 transition hover:font-bold' href="/">Home</Link>
        <Link className=' hover:text-orange-500 transition  hover:font-bold' href="/classes">classes</Link>
        <Link className=' hover:text-orange-500 transition  hover:font-bold' href="/about">about</Link>
      </div>
      <div className='flex gap-4 text-center capitalize items-center justify-center'>
        {uid ? (
        <Link href="/dashbord" className=' hover:text-orange-500 transition  hover:font-bold'>Dashboard</Link>
      ) : (
        <>
          <Link href="/login" className=' hover:text-orange-500 transition  hover:font-bold cursor-pointer'><button className='cursor-pointer'>Login</button></Link>
          <Link href="/register" className='px-4 py-2 bg-orange-500 text-white font-bold rounded'>Sign up</Link>
        </>
      )}
    </div>
    </div>
    
  )
}

export default Navbar