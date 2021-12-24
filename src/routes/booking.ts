import express from 'express'
import { getBookingList, createBooking, finishBooking } from '../controllers/booking'
const router = express.Router()

router.get('/bookings', getBookingList)
router.post('/bookings', createBooking)
router.patch('/bookings/:bookingId/finish', finishBooking)

export { router as bookingRouter }
