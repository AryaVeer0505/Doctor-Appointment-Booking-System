import React from 'react'
import { specialityData } from '../assets/assets_frontend/assets'
import { Link } from 'react-router-dom'

const SpecialityMenu = () => {
  return (
    <div id='speciality' className='flex flex-col items-center gap-4 py-20 text-gray-800'>
      <h1 className='text-3xl font-medium'>Find By Speciality</h1>
      <p className='sm:w-1/3 text-center text-sm'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Deserunt aliquam ex nostrum nulla ipsa reiciendis commodi mollitia cum culpa minima?</p>
      <div className='flex sm:justify-center gap-8 pt-5  w-full overflow-scroll'>
         {
            specialityData.map((item,index)=>(
                <Link onClick={()=>scrollTo(0,0)} key={index} to={`/doctors/${item.speciality}`} className='flex flex-col items-center text-xs cursor-pointer hover:-translate-y-2.5 transition-all duration-500'>
                   <img className='w-16 sm:w-24 mb-2' src={item.image} alt="" />
                   <p>{item.speciality}</p>
                </Link>
            ))
         }
      </div>
    </div>
  )
}

export default SpecialityMenu
