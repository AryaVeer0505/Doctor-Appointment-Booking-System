import React from 'react'
import { assets } from '../assets/assets_frontend/assets'

const Footer = () => {
  return (
    <div className='md:mx-10'>
      <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
        <div>
           <img className='mb-5 w-40' src={assets.logo} alt="" />
           <p className='w-full md:w-2/3 text-gray-500 leading-6'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores doloremque facilis, beatae dicta qui, velit ullam atque modi voluptatem aliquam, hic iusto pariatur quam nemo!</p>
        </div>
        <div>
            <p className='text-xl font-medium mb-5'>Company</p>
            <ul className='flex flex-col gap-2 text-gray-600'>
                <li>Home</li>
                <li>About Us</li>
                <li>Contact Us</li>
                <li>Privacy Policy</li>
            </ul>
        </div>
        <div>
           <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
           <ul className='flex flex-col gap-2 text-gray-600'>
            <li>+91 123456778</li>
            <li>ak@gmail.com</li>
           </ul>
        </div>
      </div>
      <div>
        <hr />
        <p className='text-center text-sm py-4'>Copyright @Prescripto-2025</p>
      </div>
    </div>
  )
}

export default Footer
