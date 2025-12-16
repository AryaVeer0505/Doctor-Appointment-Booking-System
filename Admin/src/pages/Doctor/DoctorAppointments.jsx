/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from 'react'
import { DoctorContext } from '../../context/doctorContext'
import { AppContext } from '../../context/appContext'
import { AdminContext } from '../../context/adminContext'
import { assets } from '../../assets/assets_admin/assets'

const DoctorDashboard = () => {
    const {dToken,getAppointments,appointments,cancelAppointment,completeAppointment}=useContext(DoctorContext)
    const {calculateAge,slotDateFormat}=useContext(AppContext)
    const {currency}=useContext(AdminContext)

    useEffect(()=>{
        if(dToken){
            getAppointments()
        }
    },[dToken])
  return (
    <div className='w-full max-w-6xl m-5'>
      <p className='mb-3 text-lg font-medium'>All Appointments</p>
      <div className='bg-white border rounded text-sm max-h-[80vh] min-h-[50vh] overflow-y-scroll'>
        <div className='max-sm:hidden grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-1 py-3 px-6 border-b'>
            <p>#</p>
            <p>Patient</p>
            <p>Payment Status</p>
            <p>Age</p>
            <p>Date/Time</p>
            <p>Fee</p>
            <p>Action</p>
        </div>
        {
            appointments.reverse().map((item,index)=>(
                <div className='max-sm:hidden grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-1 py-3 px-6 items-center hover:bg-gray-50 transition-all border-b  flex-wrap justify-between'  key={index}>
                    <p className='max-sm:hidden '>{index+1}</p>
                    <div className='flex items-center gap-3'>
                        <img className='rounded-full w-8' src={item.userData.image} alt="" />
                        <p>{item.userData.name}</p>
                    </div>
                    <div>
                        <p className='text-sm inline border border-[#5f6fff] px-3 rounded-full'>{
                            item.payment?'Online':'Cash'
                            }</p>
                    </div>
                    <p className='max-sm:hidden'>{calculateAge(item.userData.dob)}</p>
                    <p>{slotDateFormat(item.slotDate)} || {item.slotTime}</p>
                    <p>{currency}{item.docData.fees}</p>
                    {
                        item.cancelled 
                        ? <p className='text-red-400 text-sm'>Cancelled</p>
                        : item.isCompleted 
                        ? <p className='text-green-400 text-sm'>Completed</p>
                        :
                         <div className='flex gap-2'>
                        <img className='w-10 cursor-pointer' src={assets.cancel_icon} alt="" onClick={()=>cancelAppointment(item._id)}/>
                        <img className='w-10 cursor-pointer' src={assets.tick_icon} alt="" onClick={()=>completeAppointment(item._id)}/>
                     </div>
                    }
                    
                </div>
            ))
        }
      </div>
    </div>
  )
}

export default DoctorDashboard
