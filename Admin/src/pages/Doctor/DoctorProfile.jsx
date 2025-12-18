/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import { useContext } from 'react'
import { DoctorContext } from '../../context/doctorContext'
import { AdminContext } from '../../context/adminContext'
import { useEffect } from 'react'
import { useState } from 'react'
import { toast } from 'react-toastify'
import axios from 'axios'

const DoctorProfile = () => {
  const {dToken,setProfileData,profileData,doctorProfile}=useContext(DoctorContext)
  const {currency,backendURL}=useContext(AdminContext)
  const [isEdit,setIsEdit]=useState(false)

  const updateProfile=async(req,res)=>{
    try {
      const updateData={
        address:profileData.address,
        fees:profileData.fees,
        available:profileData.available
      }
      const {data}=await axios.post(`${backendURL}/api/doctor/update-profile`,updateData,{headers:{dtoken:dToken}})
      if(data.success){
        toast.success("Profile Updated")
        setIsEdit(false)
        doctorProfile()
      }else{
         toast.error(data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  useEffect(()=>{
    if(dToken){
      doctorProfile()
    }
  },[dToken])
  return profileData && (
    <div className='m-5'>
      <div className='flex flex-col gap-4 m-5'>
        <div>
          <img className='rounded w-full bg-[#5f6fff] sm:max-w-50' src={profileData.image} alt="" />
        </div>
        <div className='boder border-stone-100 bg-white p-8 py-7 rounded-lg'>
          <p className='flex items-center gap-2 text-3xl font-medium text-gray-800'>{profileData.name}</p>
          <div className='flex items-center gap-2 mt-1 text-gray-600'>
            <p>{profileData.degree} - {profileData.speciality}</p>
            <button className='border py-1 px-2 rounded-full text-xs'>{profileData.experience}</button>
          </div>
          <div>
            <p className='flex items-center mt-3 gap-2 text-sm font-medium text-neutral-800'>About:</p>
            <p className='text-sm text-gray-600 mt-1'>{profileData.about}</p>
          </div>
          <p className='mt-4 font-medium text-gray-600'>Appointment Fees: <span className='text-gray-950'>{currency}{isEdit? <input onChange={(e)=>setProfileData(prev=>({...prev,fees:e.target.value}))} value={profileData.fees} type='number'/> : profileData.fees}</span></p>
          <div className='flex gap-2 py-2'>
            <p>Address:</p>
            <p className='text-sm'>{isEdit? <input type='text' onChange={(e)=>setProfileData(prev=>({...prev,address:{...prev.address,line1:e.target.value}}))} value={profileData.address.line1}/> :profileData.address.line1}</p>
            <br />
            {isEdit? <input type='text' onChange={(e)=>setProfileData(prev=>({...prev,address:{...prev.address,line2:e.target.value}}))} value={profileData.address.line2}/> :profileData.address.line2}
          </div>
          <div className='flex gap-1 pt-2'>
            <input onChange={()=>isEdit && setProfileData(prev=>({...prev,available:!prev.available}))} checked={profileData.available} type="checkbox" />
            <label htmlFor="">Availabe</label>
          </div>
          {
            isEdit
            ?
             <button onClick={updateProfile} className='border rounded-full py-1 px-5 mt-3 hover:bg-[#5f6fff] hover:text-white transition-all duration-150 cursor-pointer'>Save Information</button>
             :
             <button onClick={()=>setIsEdit(true)} className='border rounded-full py-1 px-5 mt-3 hover:bg-[#5f6fff] hover:text-white transition-all duration-150 cursor-pointer'>Edit</button>
          }
          
        </div>
        
      </div>
    </div>
  )
}

export default DoctorProfile
