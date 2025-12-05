import React from 'react'
import { assets } from '../assets/assets_frontend/assets'

const About = () => {
  return (
    <div className='flex flex-col gap-5'>
      <h1 className='text-3xl text-center text-gray-600 my-10'>ABOUT <span className='text-black'>US</span></h1>
      <div className='flex flex-col sm:flex-row gap-15'>
        <img src={assets.about_image} alt="" className='w-full sm:w-1/4 rounded'/>
        <div className='flex flex-col gap-7'>
            <p className='text-gray-600'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus perferendis, veniam quaerat minima deleniti facere amet fugit nam est soluta! Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsa, illo.</p>
            <p className='text-gray-600'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Velit fugit earum illum enim accusantium porro quod voluptatibus iusto deleniti odio, nisi corporis dolorem vero corrupti? Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex, quisquam.</p>
            <p>One Vision</p>
            <p className='text-gray-600'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt quia facere facilis maxime dolore possimus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt, quasi.</p>
        </div>
      </div>
      <p className='text-3xl my-15 text-gray-700'>WHY CHOOSE US</p>
      <div className='flex flex-col sm:flex-row'>
        <div className='border border-gray-400 flex flex-col gap-5 py-10 px-15 text-gray-600'>
             <p className='text-black'>Efficiency</p>
             <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tempore, repudiandae.</p>
        </div>
        <div className='border border-gray-400 flex flex-col gap-5 py-10 px-15 text-gray-600'>
             <p className='text-black'>Concinience</p>
             <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus, modi.</p>
        </div>
        <div className='border border-gray-400 flex flex-col gap-5 py-10 px-15 text-gray-600'>
            <p className='text-black'>Personalization</p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias, non!</p>
        </div>
      </div>
    </div>
  )
}

export default About
