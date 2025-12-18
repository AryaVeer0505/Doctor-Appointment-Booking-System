import axios from "axios";
import { createContext, useState } from "react";
import { toast } from "react-toastify";

// eslint-disable-next-line react-refresh/only-export-components
export const DoctorContext=createContext()

const DoctorContextProvider=(props)=>{
      const backendURL=import.meta.env.VITE_BACKEND_URL

      const [dToken,setDtoken]=useState(localStorage.getItem('dToken')?localStorage.getItem('dToken'):'')

      const [appointments,setAppointments]=useState([])

      const [dashData,setDashData]=useState(false)

      const [profileData,setProfileData]=useState(false)


      const getAppointments=async()=>{
        try {
            const {data}=await axios.get(`${backendURL}/api/doctor/doctor-appointments`,{headers:{dtoken:dToken}})
            if(data.success){
                setAppointments(data.appointments)
                console.log(data.appointments)
            }else{
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
      }

       const completeAppointment=async(appointmentId)=>{
        try {
            const {data}=await axios.post(`${backendURL}/api/doctor/complete-appointment`,{appointmentId},{headers:{dtoken:dToken}})
            if(data.success){
                toast.success(data.message)
                getAppointments()
            }else{
                toast.error(data.message)
            }
        } catch (error) {
             console.log(error)
            toast.error(error.message)
        }
        }

       const cancelAppointment=async(appointmentId)=>{
        try {
            const {data}=await axios.post(`${backendURL}/api/doctor/cancel-appointment`,{appointmentId},{headers:{dtoken:dToken}})
            if(data.success){
                toast.success(data.message)
                getAppointments()
            }else{
                toast.error(data.message)
            }
        } catch (error) {
             console.log(error)
            toast.error(error.message)
        }
        }

        const getDashData=async(req,res)=>{
            try {
                const {data}=await axios.get(`${backendURL}/api/doctor/doctor-dashboard`,{headers:{dtoken:dToken}})
                if(data.success){
                    setDashData(data.dashData)
                    console.log(data.dashData)
                }else{
                toast.error(data.message)
            }
            } catch (error) {
                 console.log(error)
            toast.error(error.message)
            }
        }

        const doctorProfile=async()=>{
            try {
                const {data}=await axios.get(`${backendURL}/api/doctor/doctor-profile`,{headers:{dtoken:dToken}})
                if(data.success){
                    setProfileData(data.profileData)
                    console.log(data.profileData)
                }else{
                toast.error(data.message)
                }
            } catch (error) {
                 console.log(error)
            toast.error(error.message)
            }
        }

      
    const value={
        backendURL,dToken,setDtoken,appointments,getAppointments,cancelAppointment,completeAppointment,getDashData,dashData,setDashData,doctorProfile,setProfileData,profileData
    }

    return (
        <DoctorContext.Provider value={value}>
            {props.children}
        </DoctorContext.Provider>
    )
}

export default DoctorContextProvider
