import Link from 'next/link'
import React from 'react'

function Navbar() {
  return (
    <div className='flex gap-4 p-4 shadow'>
        <Link href="/">Home</Link>
        <Link href="/classes">classes</Link>
        <Link href="/dashbord">dashbord</Link>
    </div>
  )
}

export default Navbar