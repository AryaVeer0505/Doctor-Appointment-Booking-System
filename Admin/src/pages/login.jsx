import React, { useState } from "react";

const login = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [state, setState] = useState("Admin");
  
  return (
    <form className="min-h-[80vh] flex items-center">
      <div className="rounded-xl text-sm text-gray-900 items-start m-auto p-8 gap-3 flex flex-col shadow-lg min-w-[340px] sm:min-w-96">
        <p className="my-5 text-2xl font-semibold m-auto"><span className="text-[#5f6fff]">{state}</span> Login</p>
        <div className="flex flex-col gap-2 w-full">
            <p>Email</p>
            <input className="border border-zinc-300 p-2  rounded w-full" type="text" placeholder="Enter Email"/>
        </div>
        <div className="flex flex-col gap-2 w-full">
            <p>Password</p>
            <input className="border border-zinc-300 p-2  rounded w-full" type="text" placeholder="Enter Password"/>
        </div>
        <button className="bg-[#5f6fff] text-white  w-full p-2 rounded font-semibold hover:bg-blue-200 hover:text-gray-700 transition-all duration-300 cursor-pointer">Login</button>
        {
            state==='Admin'
            ?
            <p className="my-3">Doctor Login <span onClick={()=>setState('Doctor')} className="text-[#5f6fff] font-semibold cursor-pointer">CLICK HERE</span></p>
            :
             <p className="my-3">Admin Login <span onClick={()=>setState('Admin')} className="text-[#5f6fff] font-semibold cursor-pointer">CLICK HERE</span></p>
            
        }
      </div>
    </form>
  );
};

export default login;
