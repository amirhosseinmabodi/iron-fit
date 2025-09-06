"use client"
import Link from 'next/link'
import React from 'react'
import { getCookie } from 'cookies-next';

function Navbar() {
  const uid = getCookie("UID");
  console.log(uid);
  
  return (
    <div className='flex gap-4 p-4 shadow'>
        <Link href="/">Home</Link>
        <Link href="/classes">classes</Link>
        {uid ? (
        <Link href="/dashbord">Dashboard</Link>
      ) : (
        <>
          <Link href="/login"><button>Login</button></Link>
          <Link href="/register">Sign up</Link>
        </>
      )}
    </div>
  )
}

export default Navbar