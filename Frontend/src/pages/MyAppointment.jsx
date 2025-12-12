/* eslint-disable react-hooks/set-state-in-effect */
import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const MyAppointment = () => {
  const {backendURL,token,getDoctorData}=useContext(AppContext)
  const [appointment,setAppointment]=useState([])

  const getUsersAppointment=async()=>{
    try {
      const {data}=await axios.get(`${backendURL}/api/user/appointments`,{headers:{token}})
      if(data.success){
        setAppointment(data.appointments.reverse())
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  const cancleAppointment=async(appointmentId)=>{
    try {
       const {data}=await axios.post(`${backendURL}/api/user/cancle-appointment`,{appointmentId},{headers:{token}})
       if(data.success){
        toast.success(data.message)
        getUsersAppointment()
        getDoctorData()
       }else{
        toast.error(data.message)
       }
    } catch (error) {
        console.log(error)
      toast.error(error.message)
    }
  }

useEffect(()=>{
   if(token){
    getUsersAppointment()
   }
},[token])
  return (
    <div>
      <p className='pb-3 mt-12 font-medium border-b text-zinc-700'>My Appointments</p>
      <div>
        {
          appointment.map((item,index)=>(
            <div className='grid grid-cols-[1fr_2fr] gap-4 sm:gap-6 sm:flex border-b py-2' key={index}>
              <div>
                 <img className='w-32 bg-indigo-50 rounded ' src={item.docData.image} alt="" />
              </div>
              <div className='flex-1 text-sm text-gray-700 mt-5'>
                <p className='text-black font-medium'>{item.docData.name}</p>
                <p>{item.docData.speciality}</p>
                <p className='text-black font-medium my-2'>Address</p>
                <p>{item.docData.address.line1}</p>
                <p>{item.docData.address.line2}</p>
                <p className='my-2'><span className='text-black font-medium'>Date & time:</span>{item.slotDate} || {item.slotTime}</p>
              </div>
              <div>

              </div>
              <div className='flex flex-col items-end justify-end gap-2'>
                   {!item.cancelled &&<button className='sm:min-w-48  py-2 px-14 border rounded bg-[#5f6fff] text-white w-full cursor-pointer hover:scale-105 transition-all duration-150'>Pay Here</button>}
                  {!item.cancelled && <button onClick={()=>cancleAppointment(item._id)} className='sm:min-w-48 w-full py-2 px-14 border rounded bg-gray-100 text-black  cursor-pointer hover:scale-105 transition-all duration-150'>Cancel appointment</button>}
                  {item.cancelled && <button className='sm:min-w-48 w-full border border-red-500 rounded py-2 px-10 text-red-500 '>Appointment Cancelled</button>}
                  
              </div>
              
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default MyAppointment
