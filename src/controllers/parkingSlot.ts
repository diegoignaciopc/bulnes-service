import { Request, Response } from 'express'
import { ParkingSlot, ParkingSlotInput } from '../models/parkingSlot'

const getParkingSlotList = async (req: Request, res: Response) => {
  const parkingSlots = await ParkingSlot.find().exec()

  return res.status(200).json({ data: parkingSlots })
}

const createParkingSlot = async (req: Request, res: Response) => {
  const { name, status }: ParkingSlotInput = req.body

  if (!name || !status) {
    return res.status(422).json({
      message: 'The fields name and status are required',
    })
  }

  const parkingSlotCreated = await ParkingSlot.create<ParkingSlotInput>({ name, status })

  return res.status(201).json({ data: parkingSlotCreated })
}

export { getParkingSlotList, createParkingSlot }
