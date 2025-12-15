import validator from 'validator'
import doctorModel from '../models/doctor.js'
import {v2 as cloudinary} from 'cloudinary'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import appointmentModel from '../models/appointmentModel.js'
const addDoctor=async(req,res)=>{
    try {
        const {name,email,password,image,address,degree,speciality,about,experience,fees}=req.body
        const imageFile=req.file 
        if(!name ||!email ||!password ||!address ||!degree ||!speciality ||!about ||!experience ||!fees ){
            return res.json({
                success:false,
                message:"Missing Details"
            })
        }
        if(!validator.isEmail(email)){
             return res.json({
                success:false,
                message:"Enter Correct Email"
            })
        }
        if(password.length <8){
            return res.json({
                success:false,
                message:"Enter a strong password"
            })
        }
        const salt = await bcrypt.genSalt(10)
        const hashedPassword=await bcrypt.hash(password,salt)

        const uploadImage=await cloudinary.uploader.upload(imageFile.path,{resource_type:"image"})
        const imageURL=uploadImage.secure_url

        const newDoctor=new doctorModel({
            name,
            email,
            password:hashedPassword,
            image:imageURL,
            speciality,
            degree,
            fees ,
            about,
            experience,
            address,
            date:Date.now()
        })
        await newDoctor.save()
        res.json({
            success:true,
            message:"Doctor Added"
        })
    } catch (error) {
        console.log(error)
        res.json({
            success:false,
            message:error.message
        })
    }
}


const adminLogin=async(req,res)=>{
    try {
        const {email,password}=req.body
        if(email===process.env.ADMIN_EMAIL && password===process.env.ADMIN_PASSWORD){
            const token=jwt.sign({email:process.env.ADMIN_EMAIL},process.env.JWT_SECRET)
            res.send({
                success:true,
                token
            })

        }else{
             return res.json({
            success:false,
            message:"Invalid Credentials"
        })
        }
    } catch (error) {
        console.log(error)
        res.json({
            success:false,
            message:error.message
        })
    }
}

const allDoctors=async(req,res)=>{
     try {
        const doctors=await doctorModel.find({}).select('-password')
       res.json({
        success:true,
        doctors
       })
     } catch (error) {
        console.log(error)
        res.json({
            success:false,
            message:error.message
        })
     }
}


const adminAppointments=async(req,res)=>{
    try {
        const appointments=await appointmentModel.find({})
        res.json({
            success:true,
            appointments
        })
    } catch (error) {
        res.json({
            success:false,
            message:error.message
        })
    }
}


const appointmentCancel = async (req, res) => {
  try {
   
    const { appointmentId } = req.body;

    const appointmentData = await appointmentModel.findById(appointmentId);

    await appointmentModel.findByIdAndUpdate(appointmentId, {
      cancelled: true,
    });

    const { docId, slotDate, slotTime } = appointmentData;

    const doctorData = await doctorModel.findById(docId);

    let slots_booked = doctorData.slots_booked;

    slots_booked[slotDate] = slots_booked[slotDate].filter(
      (e) => e !== slotTime
    );

    await doctorModel.findByIdAndUpdate(docId, { slots_booked });

    res.json({
      success: true,
      message: "Appointment Cancelled",
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};


export {addDoctor,adminLogin,allDoctors,adminAppointments,appointmentCancel}