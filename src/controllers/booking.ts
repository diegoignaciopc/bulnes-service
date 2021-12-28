import { Request, Response } from 'express'
import { Booking, BookingInput } from '../models/booking'
import { ParkingSlot, ParkingSlotStatus } from '../models/parkingSlot'

const getBookingList = async (req: Request, res: Response) => {
  const bookings = await Booking.find().exec()

  return res.status(200).json({ data: bookings })
}

export const createBooking = async (req: Request, res: Response) => {
  const { parkingSlotId, plate }: BookingInput = req.body

  if (!parkingSlotId || !plate) {
    return res
      .status(422)
      .json({ message: 'The fields parkingSlotId and plate are required' })
  }

  const bookingCreated = await Booking.create<BookingInput>({
    parkingSlotId,
    plate,
    startedAt: new Date(),
  })

  await ParkingSlot.findByIdAndUpdate(
    { _id: parkingSlotId },
    { $set: { status: ParkingSlotStatus.UNAVAILABLE } },
  )

  return res.status(201).json({ data: bookingCreated })
}

interface FinishBookingParams {
  parkingSlotId: BookingInput['parkingSlotId']
  total: BookingInput['total']
}
export const finishBooking = async (req: Request, res: Response) => {
  const { parkingSlotId, total }: FinishBookingParams = req.body
  const { bookingId } = req.params

  if (!bookingId || !parkingSlotId || !total) {
    return res
      .status(422)
      .json({
        message: 'The fields bookingId, parkingSlotId and price  are required',
      })
  }

  const bookingFinished = await Booking.findByIdAndUpdate(
    { _id: bookingId },
    { $set: { total, finishedAt: new Date() } },
  )

  await ParkingSlot.findByIdAndUpdate(
    { _id: parkingSlotId },
    { $set: { status: ParkingSlotStatus.AVAILABLE } },
  )

  return res.status(201).json({ data: bookingFinished })
}

export { getBookingList }
