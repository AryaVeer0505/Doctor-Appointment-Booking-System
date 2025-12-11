import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Profile from './pages/Profile'
import MyAppointment from './pages/MyAppointment'
import Login from './pages/Login'
import Contact from './pages/Contact'
import Doctors from './pages/Doctors'
import About from './pages/About'
import Appointment from './pages/Appointment'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { ToastContainer} from 'react-toastify';
const App = () => {
  return (
    <div className='mx-4 sm:mx-[10%]'>
      <ToastContainer/>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/doctors' element={<Doctors/>}/>
        <Route path='/doctors/:speciality' element={<Doctors/>}/>
        <Route path='/contact' element={<Contact/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/myAppointment' element={<MyAppointment/>}/>
        <Route path='/appointment/:docId' element={<Appointment/>}/>
        <Route path='/myProfile' element={<Profile/>}/>
      </Routes>
      <Footer/>
    </div>
  )
}

export default App
