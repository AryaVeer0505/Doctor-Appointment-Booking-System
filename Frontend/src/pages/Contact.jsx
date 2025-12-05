import React from 'react'
import { assets } from '../assets/assets_frontend/assets'

const Contact = () => {
  return (
    <div className='flex flex-col gap-5'>
      <h1 className='text-center text-3xl my-15 text-gray-700'>CONTACT <span className='text-black'>US</span></h1>
      <div className='flex flex-col sm:flex-row gap-10 justify-center'>
        <img src={assets.contact_image} alt="" className='w-full md:max-w-1/3 rounded'/>
        <div className='flex flex-col gap-10 text-gray-600'>
            <p className='text-2xl text-black font-medium'>OUR OFFICE</p>
            <p>4534543 Willims Station <br />Suite 350,WashingTon,USA</p>
            <p>Tel:5365346356 <br />Email:ak@gmail.com</p>
            <p className='text-2xl text-black font-medium'>CAREERS AT PRESCRIPTO</p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
            <button className='flex items-start border border-gray-600 py-3 px-4 w-fit cursor-pointer hover:bg-black hover:text-white transition-all duration-150'>Explore Jobs</button>
        </div>
      </div>
    </div>
  )
}

export default Contact
