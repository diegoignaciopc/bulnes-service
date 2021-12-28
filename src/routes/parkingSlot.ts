import express from 'express'
import {
  getParkingSlotList,
  createParkingSlot,
} from '../controllers/parkingSlot'
import { authMiddleware } from '../middlewares/authMiddleware'
const router = express.Router()

router.get('/parkings', authMiddleware, getParkingSlotList)
router.post('/parkings', authMiddleware, createParkingSlot)

export { router as parkingRouter }
