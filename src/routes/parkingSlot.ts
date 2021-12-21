import express from 'express'
import parkingSlotController from '../controllers/parkingSlotController'
const router = express.Router()

router.get('/parking', parkingSlotController.getParkingSlotList)

export { router as parkingRouter }
