import React, { useContext } from 'react'
import {assets} from '../assets/assets_admin/assets'
import { AdminContext } from '../context/adminContext'
import {useNavigate} from 'react-router-dom'
const Navbar = () => {
    const {aToken,setAtoken}=useContext(AdminContext)
    const navigate=useNavigate()
    const logout=()=>{
      navigate('/')
        aToken && setAtoken('')
        aToken && localStorage.removeItem('aToken')
    }
  return (
    <div className='flex justify-between items-center px-4 sm:px-10 py-3 border-b bg-white'>
      <div className='flex items-center gap-5 text-xs'>
        <img className='w-36 sm:w-40 cursor-pointer' src={assets.admin_logo} alt="" />
        <p className='border border-gray-600 rounded-full py-1 px-4'>{aToken?'Admin':'Doctor'}</p>
      </div>
      <button onClick={logout} className='bg-[#5f6fff] text-white  py-1.5 px-6 rounded-full text-sm hover:bg-black transition-all duration-300'>Logout</button>
    </div>
  )
}

export default Navbar
