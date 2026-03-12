import React from 'react'
import Logo from "../assets/Logo.png"
import githubLogo from '../assets/github-logo.png'
import { Link, NavLink } from 'react-router-dom'


const Navbar = () => {
    return (
        <nav className='flex text-white drop-shadow-sm drop-shadow-white  justify-around bg-slate-950 items-center p-2'>

            <div className='flex md:flex-row flex-col items-center md:gap-3'>
                <img className='invert w-12 md:w-15' src={Logo} alt="" />
                <div className='md:text-lg text-md text-shadow-lg text-shadow-blue-800'>
                    <span className='md:text-xl text-md font-semibold text-green-300'>E</span>du <span className='md:text-xl text-md font-semibold text-green-500'>Z</span>ap
                </div>
            </div>

            <div>
                <ul className='flex gap-4'>
                    <NavLink className={(e) => e.isActive ? "text-md md:text-lg text-amber-300 font-semibold" : ""} to="/">
                        <li className='transition-all hover:cursor-pointer'>Home</li>
                    </NavLink>
                    <NavLink className={(e) => e.isActive ? "text-md md:text-lg text-amber-300 font-semibold" : ""} to="/tasks">
                        <li className='transition-all hover:cursor-pointer'>Tasks</li>
                    </NavLink>
                    <NavLink className={(e) => e.isActive ? "text-md md:text-lg text-amber-300 font-semibold" : ""} to="/notes">
                        <li className='transition-all hover:cursor-pointer'>Notes</li>
                    </NavLink>
                </ul>
            </div>

            <Link to="https://github.com/MuhammadAhmadCode/edu-zap" target='_blank'>

                <div className='flex hover:bg-blue-800 md:hover:text-xl md:text-lg text-md hover:text-lg text-gray-100 hover:text-gray-200 transition-all bg-blue-950 gap-2 rounded-xl px-3 py-1 items-center'>

                    <div className=''>
                        GitHub
                    </div>

                    <img className='w-10' src={githubLogo} alt="" />

                </div>
            </Link>

        </nav>
    )
}

export default Navbar