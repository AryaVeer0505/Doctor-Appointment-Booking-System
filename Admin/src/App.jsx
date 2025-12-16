import React, { useContext } from 'react'
import Login from './pages/login.jsx'
import { ToastContainer} from 'react-toastify';
import { AdminContext } from './context/adminContext.jsx';
import Navbar from './components/Navbar.jsx';
import Sidebar from './components/Sidebar.jsx';
import { Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Admin/Dashboard.jsx';
import AllAppointments from './pages/Admin/AllAppointments.jsx';
import AddDoctor from './pages/Admin/AddDoctor.jsx';
import DoctorsList from './pages/Admin/DoctorsList.jsx';
import { DoctorContext } from './context/doctorContext.jsx';
import DoctorAppointments from './pages/Doctor/DoctorAppointments.jsx';
import DoctorProfile from './pages/Doctor/DoctorProfile.jsx';
import DoctorDashboard from './pages/Doctor/DoctorDashboard.jsx';
const App = () => {
    const {aToken}=useContext(AdminContext)
    const {dToken}=useContext(DoctorContext)
  return aToken || dToken ? (
    <div className='bg-gray-50'>
     <ToastContainer/>
     <Navbar/>
     <div className='flex items-start'>
      <Sidebar/>
      <Routes>
        <Route path='/' element={<></>}/>
        <Route path='/admin-dashboard' element={<Dashboard/>}/>
        <Route path='/all-appointments' element={<AllAppointments/>}/>
        <Route path='/doctors-list' element={<DoctorsList/>}/>
        <Route path='/add-doctor' element={<AddDoctor/>}/>
        <Route path='/doctor-dashboard' element={<DoctorDashboard/>}/>
        <Route path='/doctor-profile' element={<DoctorProfile/>}/>
        <Route path='/doctor-appointments' element={<DoctorAppointments/>}/>
      </Routes>
     </div>
    </div>
  ):(
    <>
      <Login/>
     <ToastContainer/>
    </>
  )
}

export default App
