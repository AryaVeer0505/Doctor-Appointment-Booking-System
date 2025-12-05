/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { assets } from '../assets/assets_frontend/assets'
import RelatedDoctors from '../components/RelatedDoctors'

const Appointment = () => {
  const { docId } = useParams()
  const { doctors,currency } = useContext(AppContext)
  const daysOfWeek=['SUN','MON','TUE','WED','THU','FRI','SAT']
  const [docInfo, setDocInfo] = useState(null)
  const [docSlots,setDocSlots]=useState([])
  const [slotIndex,setSlotIndex]=useState(0)
  const [slotTime,setSlotTime]=useState('')

  const fetchDocInfo = () => {
    const found = doctors.find(doc => String(doc._id) === String(docId))
    setDocInfo(found)
  }

const getAvailableSlots=async()=>{
     setDocSlots([])

    //  get current date 
     let today=new Date()

     for(let i=0;i<7;i++){

      // getting date with index 
      let currentDate=new Date(today)
      currentDate.setDate(today.getDate()+i)

      // setting endtime of the date with index 
      let endTime=new Date()
      endTime.setDate(today.getDate()+i)
      endTime.setHours(21,0,0,0)

      // set hours 
      if(today.getDate()===currentDate.getDate()){
        currentDate.setHours(currentDate.getHours()>10?currentDate.getHours()+1:10)
        currentDate.setMinutes(currentDate.getMinutes()>30?30:0)
      }else{
        currentDate.setHours(10)
        currentDate.setMinutes(0)
      }

      let timeSLots=[]
      while(currentDate < endTime){
        let formatedTime=currentDate.toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'})

        timeSLots.push({
          dateTime:new Date(currentDate),
          time:formatedTime
        })
        currentDate.setMinutes(currentDate.getMinutes()+30)
      }

      setDocSlots(prev=>([...prev,timeSLots]))
     }
}

  useEffect(() => {
    fetchDocInfo()
  }, [doctors, docId])

  useEffect(()=>{
     getAvailableSlots()
  },[docInfo])

  useEffect(()=>{
    console.log(docSlots)
  },[docSlots])

  return docInfo &&(
    <div>
      <div className='flex flex-col sm:flex-row gap-4'>
        <div>
          <img src={docInfo.image} alt="" className='bg-[#5f6fff] w-full sm:max-w-72 rounded-lg'/>
        </div>
        <div className='flex-1 border border-gray-400 rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 -mt-20 sm:mt-0'>
          <p className='flex items-center gap-2 text-2xl font-medium text-gray-900'>
            {docInfo.name}
            <img src={assets.verified_icon} alt="" />
          </p>
          <div className='flex items-center gap-2 text-sm mt-1 text-gray-600'>
            <p>{docInfo.degree} - {docInfo.speciality}</p>
            <button className='py-1 px-3 rounded-full border border-gray-800'>{docInfo.experience}</button>
          </div>
          <div>
            <p className='flex gap-2 font-medium my-2'>About <img src={assets.info_icon} alt="" /></p>
            <p className='text-sm text-gray-600'>{docInfo.about}</p>
          </div>
          <p className='mt-5 text-gray-600'>Appointment Fees
           <span className='text-black'>:{currency}{docInfo.fees}</span> </p>
        </div>
      </div>
       
       <div className='sm:ml-72 sm:pl-4 mt-4 font-medium text-gray-700'>
        <p>Booking Slots</p>
        <div className='flex gap-3 items-center w-full overflow-x-scroll mt-4'>
          {
            docSlots.length && docSlots.map((item,index)=>(
                <div onClick={()=>setSlotIndex(index)} className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${slotIndex===index?'bg-[#5f6fff] text-white':'border border-gray-600'}`} key={index}>
                  <p>{item[0] && daysOfWeek[item[0].dateTime.getDay()]}</p>
                  <p>{item[0] && item[0].dateTime.getDate()}</p>
                </div>
            ))
          }
        </div>
        <div className='flex items-center gap-3 w-full overflow-x-scroll mt-4'>
          {
            docSlots.length && docSlots[slotIndex].map((item,index)=>(
              <p onClick={()=>setSlotTime(item.time)} className={`text-sm shrink-0 font-medium px-8 py-2 rounded-full cursor-pointer ${item.time===slotTime ? 'bg-[#5f6fff] text-white':'text-gray-400 border border-gray-300'}`} key={index}>{item.time.toLowerCase()}</p>
            ))
          }
        </div>
        <button className='bg-[#5f6fff] text-white py-2 px-14 mt-5 rounded-full font-light cursor-pointer'>Book an Appointment</button>
       </div>
       <RelatedDoctors docId={docId} speciality={docInfo.speciality}/>
    </div>
  )
}

export default Appointment
