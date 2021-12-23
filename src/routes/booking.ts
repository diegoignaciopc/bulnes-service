import express from 'express'
import { getBookingList, createBooking } from '../controllers/booking'
const router = express.Router()

router.get('/bookings', getBookingList)
router.post('/bookings', createBooking)

export { router as bookingRouter }
