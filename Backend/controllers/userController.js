import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";
import { v2 as cloudinary } from "cloudinary";
import doctorModel from "../models/doctor.js";
import appointmentModel from "../models/appointmentModel.js";
import razorpay from "razorpay";

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.json({ success: false, message: "Missing Details" });
    }
    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Enter a valid email" });
    }
    if (password.length < 8) {
      return res.json({ success: false, message: "Enter a Strong Password" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const userData = {
      name,
      email,
      password: hashedPassword,
    };

    const newUser = new userModel(userData);
    const user = await newUser.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    res.json({
      success: true,
      token,
      message: "User Registered Successfully",
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.json({ success: false, message: "Missing Details" });
    }

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "User Does not exist" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      res.json({
        success: true,
        token,
        message: "User Logged in Successfully",
      });
    } else {
      return res.json({ success: false, message: "Invalid Credentials" });
    }
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

const getProfile = async (req, res) => {
  try {
    const { userId } = req.user;
    const userData = await userModel.findById(userId).select("-password");
    res.json({
      success: true,
      userData,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

const updateProfile = async (req, res) => {
  try {
    const { userId } = req.user;
    const { name, dob, phone, address, gender } = req.body;
    const imageFile = req.file;
    if (!name || !gender || !dob || !phone) {
      res.json({
        success: false,
        message: "Data Missing",
      });
    }
    await userModel.findByIdAndUpdate(userId, {
      name,
      phone,
      gender,
      dob,
      address: address ? JSON.parse(address) : undefined,
    });
    if (imageFile) {
      const uploadImg = await cloudinary.uploader.upload(imageFile.path, {
        resource_type: "image",
      });
      const imageURL = uploadImg.secure_url;
      await userModel.findByIdAndUpdate(userId, { image: imageURL });
    }
    res.json({
      success: true,
      message: "Profile Updated",
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

const bookAppointment = async (req, res) => {
  try {
    const { userId } = req.user;
    const { docId, slotDate, slotTime } = req.body;
    const docData = await doctorModel.findById(docId).select("-password");

    if (!docData.available) {
      return res.json({
        success: false,
        message: "Doctor not Available",
      });
    }
    let slots_booked = docData.slots_booked;

    if (slots_booked[slotDate]) {
      if (slots_booked[slotDate].includes(slotTime)) {
        return res.json({
          success: false,
          message: "Slot not Available",
        });
      } else {
        slots_booked[slotDate].push(slotTime);
      }
    } else {
      slots_booked[slotDate] = [];
      slots_booked[slotDate].push(slotTime);
    }

    const userData = await userModel.findById(userId).select("-password");

    delete docData.slots_booked;

    const appointmentData = {
      userId,
      docId,
      userData,
      docData,
      amount: docData.fees,
      slotDate,
      slotTime,
      date: Date.now(),
    };

    const newAppointment = new appointmentModel(appointmentData);
    await newAppointment.save();

    await doctorModel.findByIdAndUpdate(docId, { slots_booked });

    res.json({
      success: true,
      message: "Appointment Booked",
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

const listAppointment = async (req, res) => {
  try {
    const { userId } = req.user;
    const appointments = await appointmentModel.find({ userId });
    res.json({
      success: true,
      appointments,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

const cancelAppointment = async (req, res) => {
  try {
    const { userId } = req.user;
    const { appointmentId } = req.body;

    const appointmentData = await appointmentModel.findById(appointmentId);

    if (appointmentData.userId !== userId) {
      return res.json({
        success: false,
        message: "UnAuthorized Action",
      });
    }
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

const razorpayInstanse = new razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

const paymentRazorpay = async (req, res) => {
  try {
    const { appointmentId } = req.body;
    const appointmentData = await appointmentModel.findById(appointmentId);

    if (!appointmentData || appointmentData.cancelled) {
      res.json({
        success: false,
        message: "Appointment Cancelled or not found",
      });
    }

    const options = {
      amount:  Number(appointmentData.amount) * 100,
      currency: "INR",
      receipt: appointmentId,
    };

    const order=await razorpayInstanse.orders.create(options)
    res.json({
      success:true,order
    })
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};


const verifyRazorpay=async(req,res)=>{
  try {
    const {razorpay_order_id}=req.body
    const orderInfo=await razorpayInstanse.orders.fetch(razorpay_order_id)
    if(orderInfo.status==="paid"){
      await appointmentModel.findByIdAndUpdate(orderInfo.receipt,{payment:true})
       res.json({
      success:true,message:"Payment Successful"
    })
    }else{
        res.json({
      success:false,message:"Payment failed"
    })
    }
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
}


export {
  registerUser,
  userLogin,
  getProfile,
  updateProfile,
  bookAppointment,
  listAppointment,
  cancelAppointment,
  paymentRazorpay,
  verifyRazorpay
};
