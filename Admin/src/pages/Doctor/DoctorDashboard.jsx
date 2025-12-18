/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useContext } from "react";
import { DoctorContext } from "../../context/doctorContext";
import { useEffect } from "react";
import { assets } from "../../assets/assets_admin/assets";
import { AdminContext } from "../../context/adminContext";
import { AppContext } from "../../context/appContext";

const DoctorDashboard = () => {
  const { dashData, setDashData, getDashData, dToken,completeAppointment,cancelAppointment } =
    useContext(DoctorContext);
  const { currency} = useContext(AdminContext);
  const { slotDateFormat } = useContext(AppContext);

  useEffect(() => {
    if (dToken) {
      getDashData();
    }
  }, [dToken]);
  return (
    dashData && (
      <div className="m-5">
        <div className="flex flex-wrap gap-3">
          <div className="flex gap-2 items-center bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all">
            <img className="w-14" src={assets.earning_icon} alt="" />

            <div>
              <p className="text-lg font-semibold">
                {currency}
                {dashData.earning}
              </p>
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
            {dashData.latestAppointments.map((item, index) => (
              <div
                className="flex items-center gap-3 hover:bg-gray-100 px-6 py-3"
                key={index}
              >
                <img
                  className="rounded-full w-10"
                  src={item.userData.image}
                  alt=""
                />
                <div className="flex-1 text-sm">
                  <p className="font-medium">{item.userData.name}</p>
                  <p className="text-gray-600">
                    {slotDateFormat(item.slotDate)}
                  </p>
                </div>
                {item.cancelled ? (
                  <p className="text-red-400 text-sm">Cancelled</p>
                ) : item.isCompleted ? (
                  <p className="text-green-400 text-sm">Completed</p>
                ) : (
                  <div className="flex gap-2">
                    <img
                      className="w-10 cursor-pointer"
                      src={assets.cancel_icon}
                      alt=""
                      onClick={() => cancelAppointment(item._id)}
                    />
                    <img
                      className="w-10 cursor-pointer"
                      src={assets.tick_icon}
                      alt=""
                      onClick={() => completeAppointment(item._id)}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  );
};

export default DoctorDashboard;
