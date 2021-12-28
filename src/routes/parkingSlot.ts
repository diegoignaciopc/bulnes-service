import express from 'express'
import { getParkingSlotList, createParkingSlot } from '../controllers/parkingSlot'
const router = express.Router()

router.get('/parkings', getParkingSlotList)
router.post('/parkings', createParkingSlot)

export { router as parkingRouter }
