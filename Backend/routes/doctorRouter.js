import express from 'express'
const doctorRouter=express.Router()
import { appointmentCancel, appointmentCompleted, doctorAppointments, doctorList, doctorLogin } from '../controllers/doctorController.js'
import authDoctor from '../middlewares/authDoctor.js'
doctorRouter.get('/list',doctorList)
doctorRouter.get('/doctor-appointments',authDoctor,doctorAppointments)
doctorRouter.post('/login',doctorLogin)
doctorRouter.post('/cancel-appointment',authDoctor,appointmentCancel)
doctorRouter.post('/complete-appointment',authDoctor,appointmentCompleted)

export default doctorRouter