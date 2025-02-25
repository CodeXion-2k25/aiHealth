"use client"
import Link from 'next/link'
import React, { useState } from 'react'
import Nav from './Nav'
import SignUser from '/app/SignUser/page'

const Header = () => {
  const [showSignUser, setShowSignUser] = useState(false);
  return (
    <header className="fixed top-0 z-10 flex px-8 py-4 bg-white w-full">
      <div className="flex w-full justify-between">
        {/*---Logo---*/}
        <Link href="/">
          <h1>
            AI<span>health</span>
          </h1>
        </Link>

        {/*---Desktop Nav---*/}
        <div className="flex">
          <Nav />
        </div>

        {/* user option for log in */}
        <Link href="/">
          <button
            className="bg-blue-400 px-3 py-2 rounded-md"
            onClick={() => setShowSignUser(true)}
          >
            Sign in
          </button>
        </Link>
        {showSignUser && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black/50"
          onClick={() => setShowSignUser(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
          > 
            <SignUser />
          </div>
        </div>
      )}
      </div>
    </header>
  );
}

export default Header