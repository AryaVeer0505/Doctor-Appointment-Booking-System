import bcrypt from "bcryptjs";
import doctorModel from "../models/doctor.js";
import jwt from "jsonwebtoken";
import appointmentModel from "../models/appointmentModel.js";
const changeAvailability = async (req, res) => {
  try {
    const { docId } = req.body;
    const docData = await doctorModel.findById(docId);
    await doctorModel.findByIdAndUpdate(docId, {
      available: !docData.available,
    });
    res.json({
      success: true,
      message: "Availability Changed",
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

const doctorList = async (req, res) => {
  try {
    const doctors = await doctorModel
      .find({})
      .select({ password: 0, email: 0 });
    res.json({ success: true, doctors });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const doctorLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.json({
        success: false,
        message: "Missing Details",
      });
    }
    const doctor = await doctorModel.findOne({ email });
    if (!doctor) {
      return res.json({
        success: false,
        message: "Does not exist",
      });
    }

    const isMatch = await bcrypt.compare(password, doctor.password);
    if (isMatch) {
      const token = jwt.sign({ id: doctor._id }, process.env.JWT_SECRET);
      res.json({
        success: true,
        token,
      });
    } else {
      return res.json({
        success: false,
        message: "Invalid Credentials",
      });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const doctorAppointments = async (req, res) => {
  try {
    const {docId}=req.doctor 
    const appointments=await appointmentModel.find({docId})
    res.json({
        success:true,
        appointments
    })
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};


const appointmentCompleted=async(req,res)=>{
    try {
        const {docId}=req.doctor 
        const {appointmentId}=req.body 
        const appointmentData=await appointmentModel.findById(appointmentId)

        if(appointmentData && appointmentData.docId === docId){
            await appointmentModel.findByIdAndUpdate(appointmentId,{isCompleted:true})
             return  res.json({
                  success:true,
                  message:"Appointment Completed"
            })
        }else{
              return  res.json({
                  success:false,
                  message:"Mark Failed"
            })
        }
    } catch (error) {
         console.log(error);
    res.json({ success: false, message: error.message });
    }
}

const appointmentCancel=async(req,res)=>{
    try {
        const {docId}=req.doctor 
        const {appointmentId}=req.body 
        const appointmentData=await appointmentModel.findById(appointmentId)

        if(appointmentData && appointmentData.docId === docId){
            await appointmentModel.findByIdAndUpdate(appointmentId,{cancelled:true})
             return  res.json({
                  success:true,
                  message:"Appointment Cancelled"
            })
        }else{
              return  res.json({
                  success:false,
                  message:"Mark Failed"
            })
        }
    } catch (error) {
         console.log(error);
    res.json({ success: false, message: error.message });
    }
}
export { changeAvailability, doctorList, doctorLogin,doctorAppointments,appointmentCompleted,appointmentCancel };
