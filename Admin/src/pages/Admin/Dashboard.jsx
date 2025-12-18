/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from "react";
import { AdminContext } from "../../context/adminContext";
import { assets } from "../../assets/assets_admin/assets";
import { AppContext } from "../../context/appContext";

const Dashboard = () => {
  const { aToken, dashData, getDashData, cancelAppointment } =
    useContext(AdminContext);

  const { slotDateFormat } = useContext(AppContext);
  useEffect(() => {
    if (aToken) {
      getDashData();
    }
  }, [aToken]);
  return (
    dashData && (
      <div className="m-5">
        <div className="flex flex-wrap gap-3">
          <div className="flex gap-2 items-center bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all">
            <img className="w-14" src={assets.doctor_icon} alt="" />

            <div>
              <p className="text-lg font-semibold">{dashData.doctors}</p>
              <p className="text-sm text-gray-500">Doctors</p>
            </div>
          </div>
          <div className="flex gap-2 items-center bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all">
            <img className="w-14" src={assets.appointments_icon} alt="" />

            <div>
              <p className="text-lg font-semibold">{dashData.appointments}</p>
              <p className="text-sm text-gray-500">Appointments</p>
            </div>
          </div>
          <div className="flex gap-2 items-center bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all">
            <img className="w-14" src={assets.patients_icon} alt="" />

            <div>
              <p className="text-lg font-semibold">{dashData.patients}</p>
              <p className="text-sm text-gray-500">Patients</p>
            </div>
          </div>
        </div>
        <div className="bg-white">
          <div className="flex items-center gap-2 p-4 mt-10 rounded-t border">
            <img src={assets.list_icon} alt="" />
            <p className="font-semibold">Latest Appointments</p>
          </div>
          <div className="pt-4 border  border-t-0">
            {dashData.latestAppointment.map((item, index) => (
              <div
                className="flex items-center gap-3 hover:bg-gray-100 px-6 py-3"
                key={index}
              >
                <img
                  className="rounded-full w-10"
                  src={item.docData.image}
                  alt=""
                />
                <div className="flex-1 text-sm">
                  <p className="font-medium">{item.docData.name}</p>
                  <p className="text-gray-600">
                    {slotDateFormat(item.slotDate)}
                  </p>
                </div>
                {item.cancelled ? (
                  <p className="text-red-500 text-xs font-medium">Cancelled</p>
                ) : item.isCompleted ? (
                  <p className="text-green-500 text-xs font-medium">
                    Completed
                  </p>
                ) : (
                  <img
                    onClick={() => cancelAppointment(item._id)}
                    src={assets.cancel_icon}
                    className="w-10 cursor-pointer"
                    alt=""
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  );
};

export default Dashboard;
