import express, { Request, Response } from 'express'
import bookingController from '../controllers/bookingController'
const router = express.Router()

router.get('/bookings', bookingController.getBookingList)

export { router as bookingRouter }
