import axios from "axios";
import { createContext, useState } from "react";
import { toast } from "react-toastify";

// eslint-disable-next-line react-refresh/only-export-components
export const AdminContext=createContext()

const AdminContextProvider=(props)=>{
      const [aToken,setAtoken]=useState(localStorage.getItem('aToken')?localStorage.getItem('aToken'):'')
      const backendURL=import.meta.env.VITE_BACKEND_URL
      const [appointments,setAppointments]=useState([])

      const [doctors,setDoctors]=useState([])

      const currency="$"
      const getAllDoctors=async()=>{
        try {
            const {data}=await axios.post(`${backendURL}/api/admin/all-doctors`,{},{headers:{atoken:aToken}})
            if(data.success){
                setDoctors(data.doctors)
            }else{
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
      }

      const changeAvailability=async(docId)=>{
        try {
            const {data}=await axios.post(`${backendURL}/api/admin/change-availability`,{docId},{headers:{atoken:aToken}})
            if(data.success){
                toast.success(data.message)
                getAllDoctors()
            }else{
                toast.error(data.message)
            }
        } catch (error) {
             toast.error(error.message)
        }
      }

      const getAllAppointments=async()=>{
        try {
            const {data}=await axios.get(`${backendURL}/api/admin/appointments`,{headers:{atoken:aToken}})
            if(data.success){
                setAppointments(data.appointments)
            }
        } catch (error) {
              toast.error(error.message)
        }
      }


      const cancelAppointment=async(appointmentId)=>{
        try {
            const {data}=await axios.post(`${backendURL}/api/admin/cancel-appointment`,{appointmentId},{headers:{atoken:aToken}})
            if(data.success){
                toast.success(data.message)
                getAllAppointments()
            }
        } catch (error) {
             toast.error(error.message)
        }
      }
    const value={
        aToken,setAtoken,
        backendURL,getAllDoctors,doctors,changeAvailability,appointments,getAllAppointments,currency,cancelAppointment
    }

    return (
        <AdminContext.Provider value={value}>
            {props.children}
        </AdminContext.Provider>
    )
}

export default AdminContextProvider
