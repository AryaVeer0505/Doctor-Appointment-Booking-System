import React, { useContext, useState } from "react";
import { AdminContext } from "../context/adminContext";
import {toast} from 'react-toastify'
import axios from "axios";
import { DoctorContext } from "../context/doctorContext";

const login = () => {
  const [state, setState] = useState("Admin");
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const { setAtoken, backendURL } = useContext(AdminContext);
  const {setDtoken}=useContext(DoctorContext)

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      if (state === "Admin") {
        const { data } = await axios.post(`${backendURL}/api/admin/login`, {
          email,
          password,
        });
        if (data.success) {
          setAtoken(data.token)
          localStorage.setItem("aToken", data.token);
          console.log("Admin Logged In:", data.token);
          toast.success('Admin Logged in Successfully')
        }else{
          toast.error(data.message)
        }
      } else {
         const {data}=await axios.post(`${backendURL}/api/doctor/login`,{email,password})
         if(data.success){
          setDtoken(data.token)
          localStorage.setItem("dToken",data.token)
          toast.success("Doctor Logged in Successfully")
         }else{
           toast.error(data.message)
         }
      }
    } catch (error) {
        console.log(error)
        toast.error(error.message)
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className="min-h-[80vh] flex items-center">
      <div className="rounded-xl text-sm text-gray-900 items-start m-auto p-8 gap-3 flex flex-col shadow-lg min-w-[340px] sm:min-w-96">
        <p className="my-5 text-2xl font-semibold m-auto">
          <span className="text-[#5f6fff]">{state}</span> Login
        </p>
        <div className="flex flex-col gap-2 w-full">
          <p>Email</p>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-zinc-300 p-2  rounded w-full"
            type="text"
            placeholder="Enter Email"
          />
        </div>
        <div className="flex flex-col gap-2 w-full">
          <p>Password</p>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-zinc-300 p-2  rounded w-full"
            type="password"
            placeholder="Enter Password"
          />
        </div>
        <button className="bg-[#5f6fff] text-white  w-full p-2 rounded font-semibold hover:bg-blue-200 hover:text-gray-700 transition-all duration-300 cursor-pointer">
          Login
        </button>
        {state === "Admin" ? (
          <p className="my-3">
            Doctor Login{" "}
            <span
              onClick={() => setState("Doctor")}
              className="text-[#5f6fff] font-semibold cursor-pointer"
            >
              CLICK HERE
            </span>
          </p>
        ) : (
          <p className="my-3">
            Admin Login{" "}
            <span
              onClick={() => setState("Admin")}
              className="text-[#5f6fff] font-semibold cursor-pointer"
            >
              CLICK HERE
            </span>
          </p>
        )}
      </div>
    </form>
  );
};

export default login;
