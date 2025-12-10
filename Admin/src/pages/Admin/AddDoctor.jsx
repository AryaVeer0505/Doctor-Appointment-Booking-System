import React, { useCallback, useContext, useState } from 'react'
import { assets } from '../../assets/assets_admin/assets'
import { AdminContext } from '../../context/adminContext'
import { toast } from 'react-toastify'
import axios from 'axios'

const AddDoctor = () => {
    const [docImg,setDocImg]=useState(false)
    const [name,setName]=useState('')
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const [about,setAbout]=useState('')
    const [fees,setFees]=useState('')
    const [experience,setExperience]=useState('1 Year')
    const [speciality,setSpeciality]=useState('General Physician')
    const [degree,setDegree]=useState('')
    const [address1,setAddress1]=useState('')
    const [address2,setAddress2]=useState('')
   
    const {backendURL,aToken}=useContext(AdminContext)

    const onSubmitHandler=async(e)=>{
        e.preventDefault()
        try {
            if(!docImg){
                return toast.error('Doctor Image missing')
            }
            const formData=new FormData()
            formData.append('image',docImg)
            formData.append('name',name)
            formData.append('email',email)
            formData.append('password',password)
            formData.append('degree',degree)
            formData.append('speciality',speciality)
            formData.append('experience',experience)
            formData.append('about',about)
            formData.append('fees',Number(fees))
            formData.append('address',JSON.stringify({line1:address1,line2:address2}))


            // formData.forEach((value,key)=>{
            //     console.log(`${key}:${value}`)
            // })

            const {data}=await axios.post(`${backendURL}/api/admin/add-doctor`,formData,{headers:{atoken:aToken}})
            if(data.success){
                toast.success(data.message)
                setDocImg(false)
                setName('')
                setEmail('')
                setPassword('')
                setFees(0)
                setAbout('')
                setDegree('')
                setExperience('1 Year')
                setSpeciality('General Physician')
                setAddress1('')
                setAddress2('')
            }else{
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
            console.log(error)
        }
    }


  return (
    <form className='m-5 w-full' onSubmit={onSubmitHandler}>
      <p className='mb-3 font-medium text-lg'>Add Doctor</p>
     <div className='bg-white px-8 py-8 rounded border w-full max-w-4xl max-h-[80vh] overflow-y-scroll'>
        <div className='flex items-center gap-3 mb-5 text-gray-700'>
            <label htmlFor="doc-img">
                <img className='w-16 cursor-pointer bg-gray-100 rounded-full' src={docImg?URL.createObjectURL(docImg): assets.upload_area} alt="" />
            </label>
            <input  onChange={(e)=>setDocImg(e.target.files[0])}  type="file" id='doc-img' hidden/>
            <p>Upload Doctor Picture</p>
        </div>
        <div className='flex flex-col lg:flex-row items-start gap-10 text-gray-600'>
            <div className='flex lg:flex-1 flex-col w-full gap-4'>
                <div className='flex flex-1 flex-col gap-1'>
                    <p>Doctor Name</p>
                    <input value={name} onChange={(e)=>setName(e.target.value)} className='border px-3 py-2 rounded' type="text" placeholder='Name' required/>
                </div>
                <div  className='flex flex-1 flex-col gap-1'>
                    <p>Doctor Email</p>
                    <input value={email} onChange={(e)=>setEmail(e.target.value)}  className='border px-3 py-2 rounded' type="email" placeholder='Email' required/>
                </div>
                <div  className='flex flex-1 flex-col gap-1'>
                    <p>Doctor Password</p>
                    <input value={password} onChange={(e)=>setPassword(e.target.value)}  className='border px-3 py-2 rounded' type="password" placeholder='Password' required/>
                </div>
                <div  className='flex flex-1 flex-col gap-1'>
                    <p>Experience</p>
                    <select value={experience} onChange={(e)=>setExperience(e.target.value)} className='border px-3 py-2 rounded' name="">
                         
                        <option value="1 Year">1 Year</option>
                        <option value="2 Year">2 Year</option>
                        <option value="3 Year">3 Year</option>
                        <option value="4 Year">4 Year</option>
                        <option value="5 Year">5 Year</option>
                        <option value="6 Year">6 Year</option>
                        <option value="7 Year">7 Year</option>
                        <option value="8 Year">8 Year</option>
                        <option value="9 Year">9 Year</option>
                        <option value="10 Year">10 Year</option>
                    </select>
                </div>
                  <div  className='flex flex-1 flex-col gap-1'>
                    <p>Doctor Fee</p>
                    <input  value={fees} onChange={(e)=>setFees(e.target.value)}  className='border px-3 py-2 rounded' type="number" placeholder='Fee' required/>
                </div>
            </div>
            <div className='w-full lg:flex-1 flex flex-col gap-4'>
                <div  className='flex flex-1 flex-col gap-1'>
                    <p>Speciality</p>
                    <select  value={speciality} onChange={(e)=>setSpeciality(e.target.value)}  className='border px-3 py-2 rounded' name="" id="">
                        <option value="General physician">General physician</option>
                        <option value="Gynecologist">Gynecologist</option>
                        <option value="Dermatologist">Dermatologist</option>
                        <option value="Pediatricians">Pediatricians</option>
                        <option value="Neurologist">Neurologist</option>
                        <option value="Gastroenterologist">Gastroenterologist</option>
                    </select>
                </div>
                <div  className='flex flex-1 flex-col gap-1'>
                    <p>Education Detail</p>
                    <input value={degree} onChange={(e)=>setDegree(e.target.value)}  className='border px-3 py-2 rounded' type="text" required placeholder='Education Detail' />
                </div>
                <div  className='flex flex-1 flex-col gap-1'>
                    <p>Address</p>
                    <input  value={address1} onChange={(e)=>setAddress1(e.target.value)}  className='border px-3 py-2 rounded mb-5' type="text" required placeholder='Address 1' />
                    <input value={address2} onChange={(e)=>setAddress2(e.target.value)}  className='border px-3 py-2 rounded' type="text" required placeholder='Address 2' />
                </div>
                
            </div>
        </div>
        <div>
            <p className='mt-4 mb-2'>About Doctor</p>
            <textarea  value={about} onChange={(e)=>setAbout(e.target.value)}  className='resize-none w-full border px-3 py-2 rounded' placeholder='Write about Doctor' rows={5}></textarea>
        </div>
        <button type='submit' className='mt-4  bg-[#5f6fff] text-white  py-2 px-6 rounded-full text-lg cursor-pointer hover:bg-black transition-all duration-300'>Add Doctor</button>
     </div>
    </form>
  )
}

export default AddDoctor
