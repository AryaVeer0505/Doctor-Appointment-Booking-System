import express from 'express'
import upload from '../middlewares/multer.js'
import { addDoctor,adminAppointments,adminDashboard,adminLogin,allDoctors, appointmentCancel } from '../controllers/adminController.js'
import authAdmin from '../middlewares/authAdmin.js'
import {changeAvailability} from '../controllers/doctorController.js'

const adminRouter=express.Router()
adminRouter.post('/add-doctor',authAdmin,upload.single('image'),addDoctor)
adminRouter.post('/all-doctors',authAdmin,allDoctors)
adminRouter.post('/login',adminLogin)
adminRouter.post('/change-availability',authAdmin,changeAvailability)
adminRouter.get('/appointments',authAdmin,adminAppointments)
adminRouter.get('/dashboard',authAdmin,adminDashboard)
adminRouter.post('/cancel-appointment',authAdmin,appointmentCancel)


export default adminRouter