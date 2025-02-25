"use client"
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react'

const links = [
    {
        name: "home",
        path: "/",
    },
    {
        name: "Symptom Checker",
        path: "/symptom-checker",
    },
    {
        name: "Nutration",
        path: "/nutration",
    },
    {
        name: "Mental Health",
        path: "/mental-health",
    },
    {
        name: "Dashboard",
        path: "/dashboard",
    },
];

const Nav = () => {
    const pathname = (usePathname);
    console.log(pathname);
    
    return (
    <nav className="flex gap-10">
        {links.map((link,idx)=>{
            return(
                <Link
                    href={link.path}
                    key={idx}
                    className={`capitalize font-popins text-black font-medium hover:text-green-400`}
                >
                    {link.name}
                </Link>
            )
        })}
    </nav>
  )
}

export default Nav