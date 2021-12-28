import express from 'express'
import {
  getBookingList,
  createBooking,
  finishBooking,
} from '../controllers/booking'
import { authMiddleware } from '../middlewares/authMiddleware'

const router = express.Router()

router.get('/bookings', authMiddleware, getBookingList)
router.post('/bookings', authMiddleware, createBooking)
router.patch('/bookings/:bookingId/finish', authMiddleware, finishBooking)

export { router as bookingRouter }
