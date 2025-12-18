import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

const RelatedDoctors = ({ speciality, docId }) => {
  const navigate = useNavigate();
  const { doctors } = useContext(AppContext);
  const [relDoc, setRelDoc] = useState([]);

  useEffect(() => {
    if (doctors.length > 0 && speciality) {
      const doctorsData = doctors.filter(
        (doc) => doc.speciality === speciality && doc._id !== docId
      );
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setRelDoc(doctorsData);
    }
  }, [doctors, speciality, docId]);

  return (
    <div className="flex flex-col items-center gap-4 my-16 text-gray-900 md:mx-10">
      <h1 className="text-3xl font-medium">Related Doctors</h1>
      <p className="sm:w-1/3 text-center text-sm">
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Deserunt
        aliquam ex nostrum nulla?
      </p>
      <div
        id="grid"
        className="w-full grid grid-cols-auto gap-4 pt-5 gap-y-6 px-3 sm:px-0"
      >
        {relDoc.slice(0, 5).map((item, index) => (
          <div
            onClick={() => {
              navigate(`/appointment/${item._id}`);
              scrollTo(0, 0);
            }}
            className="border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:-translate-y-2.5 transition-all duration-500"
            key={index}
          >
            <img className="bg-blue-50" src={item.image} alt="" />
            <div className="p-4">
              <div
                className={`flex items-center gap-2 text-sm text-center ${
                  item.available ? "text-green-500" : "text-red-500"
                } `}
              >
                <p
                  className={`w-2 h-2 rounded-full ${
                    item.available
                      ? " bg-green-500 text-green-500"
                      : "bg-red-500 text-red-500"
                  }`}
                ></p>
                <p>{item.available ? "Available" : "Not Available"}</p>
              </div>
              <p className="text-gray-900 text-lg text-center">{item.name}</p>
              <p className="text-gray-600 text-sm">{item.speciality}</p>
            </div>
          </div>
        ))}
      </div>
      <button
        onClick={() => {
          navigate("/doctors");
          scrollTo(0, 0);
        }}
        className="text-black bg-blue-100 rounded-full py-2 px-10 mt-10 cursor-pointer"
      >
        Show More
      </button>
    </div>
  );
};

export default RelatedDoctors;
