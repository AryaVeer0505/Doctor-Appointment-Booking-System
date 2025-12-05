import React from 'react'
import {assets} from '../assets/assets_frontend/assets'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useState } from 'react'
const Navbar = () => {
    const navigate=useNavigate()
    const  [showMenu,setShowMenu]=useState(false)
    const  [token,setToken]=useState(true)
  return (
    <div className='flex items-center justify-between py-4 mb-5 text-sm border-b border-b-gray-400'>
      <Link to='/'><img className='w-44 cursor-pointer' src={assets.logo} alt="" /></Link>
      <ul className='hidden md:flex items-start gap-5 font-medium'>
        <NavLink to='/'>
            <li className='py-1'>HOME</li>
            <hr className='border-0 outline-0 h-0.5 w-3/4 bg-[#5f6fff] m-auto hidden'/>
        </NavLink>
        <NavLink to='/doctors'>
            <li className='py-1'>ALL DOCTORS</li>
            <hr className='border-0 outline-0 h-0.5 w-3/4 bg-[#5f6fff] m-auto hidden'/>
        </NavLink>
        <NavLink to='/about'>
            <li className='py-1'>ABOUT</li>
            <hr className='border-0 outline-0 h-0.5 w-3/4 bg-[#5f6fff] m-auto hidden'/>
        </NavLink>
        <NavLink to='/contact'>
            <li className='py-1'>CONTACT</li>
            <hr className='border-0 outline-0 h-0.5 w-3/4 bg-[#5f6fff] m-auto hidden'/>
        </NavLink>
      </ul>
      <div className='flex gap-2'>
        {
            token ?
            <div className='group relative flex items-center gap-3 cursor-pointer'>
                <img src={assets.profile_pic} className='w-8 rounded-full'  alt="" />
                <img src={assets.dropdown_icon} className='1.5' alt="" />
                <div className='absolute top-0 right-0 pt-14 text-base hidden font-medium z-20 text-gray-600 group-hover:block'>
                    <div className='min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4'>
                        <p className='hover:text-black cursor-pointer' onClick={()=>navigate('/myProfile')}>My Profile</p>
                        <p className='hover:text-black cursor-pointer' onClick={()=>navigate('/myAppointment')}>My Appointment</p>
                        <p className='hover:text-black cursor-pointer' onClick={()=>setToken(false)}>Logout</p>
                    </div>
                </div>
            </div>
            : 
            <button onClick={()=>navigate('/login')} className='text-white bg-[#5f6fff] rounded-full py-2 cursor-pointer px-5 hidden md:block'>CREATE ACCOUNT</button>
        }
        <img onClick={()=>setShowMenu(true)} src={assets.menu_icon} className='w-6 md:hidden' alt="" />
        {
          <div className={`${showMenu?'w-full fixed':'h-0 w-0'} md:hidden right-0 top-0 bottom-0 z-20 overflow-hidden bg-white transition-all`}>
            <div className='flex items-center justify-between px-5 py-6'>
              <img className='w-35' src={assets.logo} alt="" />
              <img className='w-8' src={assets.cross_icon} onClick={()=>setShowMenu(false)} alt="" />
            </div>
            <ul className='flex flex-col items-center gap-2 px-5 text-lf font-medium'>
              <NavLink className='px-4 py-2 rounded inline-block' to='/' onClick={()=>setShowMenu(false)}>Home</NavLink>
              <NavLink className='px-4 py-2 rounded inline-block' to='/doctors' onClick={()=>setShowMenu(false)}>All Doctors</NavLink>
              <NavLink className='px-4 py-2 rounded inline-block' to='/about' onClick={()=>setShowMenu(false)}>About</NavLink>
              <NavLink className='px-4 py-2 rounded inline-block' to='/contact' onClick={()=>setShowMenu(false)}>Contact</NavLink>
            </ul>
          </div>
        }
      </div>
    </div>
  )
}

export default Navbar
