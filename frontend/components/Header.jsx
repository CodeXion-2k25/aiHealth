import Link from 'next/link'
import React from 'react'
import Nav from './Nav'

const Header = () => {
  return (
    <header className="fixed top-0 z-10 flex px-8 py-4 bg-white w-full">
        <div className="flex w-full justify-between">
            {/*---Logo---*/}
            <Link href="/">
                <h1>AI<span>health</span></h1>
            </Link>

            {/*---Desktop Nav---*/}
            <div className="flex">
                <Nav/>
            </div>
            <Link href="/">
                <button className="bg-blue-400 px-3 py-2 rounded-md ">Sign in</button>
            </Link>
        </div>
    </header>
  )
}

export default Header