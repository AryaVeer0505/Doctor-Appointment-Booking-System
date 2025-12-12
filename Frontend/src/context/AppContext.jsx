/* eslint-disable react-hooks/set-state-in-effect */
import { createContext } from "react";
import axios from 'axios'
import { useState } from "react";
import { useEffect } from "react";
import {toast} from 'react-toastify'
// eslint-disable-next-line react-refresh/only-export-components
export const AppContext = createContext();

const AppContextProvider = (props) => {
    
    const currency="$"
    const backendURL=import.meta.env.VITE_BACKEND_URL 
    const [doctors,setDoctors]=useState([])

    const [userData,setUserData]=useState(false)


    const [token,setToken]=useState(localStorage.getItem('token')?localStorage.getItem('token'):false)

    const getDoctorData=async()=>{
        try {
            const {data}=await axios.get(`${backendURL}/api/doctor/list`)
            if(data.success){
                setDoctors(data.doctors)
            }else{
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    const loadUserProfileData=async()=>{
        try {
            const {data}=await axios.get(`${backendURL}/api/user/get-profile`,{ headers: { token } })
           if(data.success){
            setUserData(data.userData)
           }else{
            toast.error(data.message)
           }
        } catch (error) {
              console.log(error)
            toast.error(error.message)
        }
    }
    useEffect(()=>{
     getDoctorData()
    },[])
    useEffect(()=>{
      if(token){
        loadUserProfileData()
      }else{
        setUserData(false)
      }
    },[token])
    const value = {
        doctors,currency,token,setToken,backendURL,userData,setUserData,loadUserProfileData,getDoctorData
    };

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider;
