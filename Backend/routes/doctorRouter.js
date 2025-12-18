import express from 'express'
const doctorRouter=express.Router()
import { appointmentCancel, appointmentCompleted, doctorAppointments, doctorDashboard, doctorList, doctorLogin, doctorProfile, updateProfile } from '../controllers/doctorController.js'
import authDoctor from '../middlewares/authDoctor.js'
doctorRouter.get('/list',doctorList)
doctorRouter.get('/doctor-appointments',authDoctor,doctorAppointments)
doctorRouter.post('/login',doctorLogin)
doctorRouter.post('/cancel-appointment',authDoctor,appointmentCancel)
doctorRouter.post('/complete-appointment',authDoctor,appointmentCompleted)
doctorRouter.get('/doctor-profile',authDoctor,doctorProfile)
doctorRouter.post('/update-profile',authDoctor,updateProfile)
doctorRouter.get('/doctor-dashboard',authDoctor,doctorDashboard)

export default doctorRouter