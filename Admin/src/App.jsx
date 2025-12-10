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
const App = () => {
    const {aToken}=useContext(AdminContext)
  return aToken ? (
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
