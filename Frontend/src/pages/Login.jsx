import React, { useState } from 'react'
import { useContext } from 'react'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

const Login = () => {

  const navigate=useNavigate()
  const {token,setToken,backendURL}=useContext(AppContext)

  const [state,setState]=useState('Sign Up')
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
  const [name,setName]=useState('')

  const onSubmitHandler=async(e)=>{
       e.preventDefault()
       try {
        if(state==='Sign Up'){
          const {data}=await axios.post(`${backendURL}/api/user/register`,{name,email,password})
          if(data.success){
           localStorage.setItem('token',data.token)
           setToken(data.token)
           
           toast.success("Logged In Successfully")
          }else{
            toast.error(data.message)
          }
        }else{
          const {data}=await axios.post(`${backendURL}/api/user/login`,{email,password})
          if(data.success){
           localStorage.setItem('token',data.token)
           setToken(data.token)
          
           toast.success("Logged In Successfully")
          }else{
            toast.error(data.message)
          }
        }
       } catch (error) {
        console.log(error)
        toast.error(error.message)
       }
  }

  useEffect(()=>{
     if(token){
      navigate('/')
     }
  },[token])

  return (
   <form onSubmit={onSubmitHandler} className='min-h-[80vh] flex items-center'>
      <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[340px]  sm:w-96 border rounded-xl text-zinc-600 text-sm shadow-lg'>
        <p className='text-2xl font-semibold'>{state==='Sign Up'?'Create Account':'Login'}</p>
        <p>Please {state==='Sign Up'?'sign up':'login'} to book appointment</p>
        { state==='Sign Up'
        &&
        <div className='w-full'>
          <p>Full Name</p>
          <input type="text" className='border border-zinc-300 rounded w-full p-2 mt-1' value={name} onChange={(e)=>setName(e.target.value)}/>
        </div>
        }
        <div className='w-full'>
          <p>Email</p>
          <input type="text" className='border border-zinc-300 rounded w-full p-2 mt-1' value={email} onChange={(e)=>setEmail(e.target.value)}/>
        </div>
        <div className='w-full'>
          <p>Password</p>
          <input type="password" className='border border-zinc-300 rounded w-full p-2 mt-1' value={password} onChange={(e)=>setPassword(e.target.value)}/>
        </div>
        <button type='submit' className='bg-[#5f6fff] text-white py-2 w-full rounded my-5 cursor-pointer hover:bg-blue-100 hover:text-gray-500 transition-all duration-150'>{state==='Sign Up'?'Create Account':'Login'}</button>
       {
        state==='Sign Up'
        ?
        <p>Already have an Account,<span className='text-[#5f6fff] underline cursor-pointer' onClick={()=>setState('Login')}> Login here</span></p>
        :
        <p>Create a new Account,<span className='text-[#5f6fff] underline cursor-pointer' onClick={()=>setState('Sign Up')}> Click here</span></p>
       }
      </div>

   </form>
  )
}

export default Login
