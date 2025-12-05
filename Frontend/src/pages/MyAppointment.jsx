import React, { useContext } from 'react'
import { AppContext } from '../context/AppContext'

const MyAppointment = () => {
  const {doctors}=useContext(AppContext)
  return (
    <div>
      <p className='pb-3 mt-12 font-medium border-b text-zinc-700'>My Appointments</p>
      <div>
        {
          doctors.slice(0,2).map((item,index)=>(
            <div className='grid grid-cols-[1fr_2fr] gap-4 sm:gap-6 sm:flex border-b py-2' key={index}>
              <div>
                 <img className='w-32 bg-indigo-50 rounded ' src={item.image} alt="" />
              </div>
              <div className='flex-1 text-sm text-gray-700'>
                <p className='text-black font-medium'>{item.name}</p>
                <p>{item.speciality}</p>
                <p className='text-black font-medium my-2'>Address</p>
                <p>{item.address.line1}</p>
                <p>{item.address.line2}</p>
                <p className='my-2'><span className='text-black font-medium'>Date & time:</span>24th July || 2025</p>
              </div>
              <div>

              </div>
              <div className='flex flex-col items-end justify-end gap-2'>
                  <button className='py-2 px-14 border rounded bg-[#5f6fff] text-white w-full cursor-pointer hover:scale-105 transition-all duration-150'>Pay Here</button>
                  <button className='py-2 px-14 border rounded bg-gray-100 text-black w-full cursor-pointer hover:scale-105 transition-all duration-150'>Cancel appointment</button>
              </div>
              
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default MyAppointment
