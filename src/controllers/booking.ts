import { Request, Response } from 'express'
import { Booking, BookingInput } from '../models/booking'
import { ParkingSlot, ParkingSlotStatus } from '../models/parkingSlot'

const getBookingList = async (req: Request, res: Response) => {
  const bookings = await Booking.find().exec()

  return res.status(200).json({ data: bookings })
}

export const createBooking = async (req: Request, res: Response) => {
  const { parkingSlotId, plate, startedAt }: BookingInput = req.body

  if (!parkingSlotId || !plate || !startedAt) {
    return res.status(422).json({
      message: 'The fields parkingSlotId, plate, price, startedAt and finishedAt are required',
    })
  }

  const bookingCreated = await Booking.create<BookingInput>({
    parkingSlotId,
    plate,
    startedAt,
  })

  await ParkingSlot.findByIdAndUpdate(
    { _id: parkingSlotId },
    { $set: { status: ParkingSlotStatus.UNAVAILABLE } },
  )

  return res.status(201).json({ data: bookingCreated })
}

interface FinishBookingParams {
  parkingSlotId: BookingInput['parkingSlotId']
  price: BookingInput['price']
  finishedAt: BookingInput['finishedAt']
}
export const finishBooking = async (req: Request, res: Response) => {
  const { parkingSlotId, price, finishedAt }: FinishBookingParams = req.body
  const { bookingId } = req.params

  if (!bookingId || !parkingSlotId || !price || !finishedAt) {
    return res.status(422).json({
      message: 'The fields bookingId, parkingSlotId, price and finishedAt are required',
    })
  }

  const bookingFinished = await Booking.findByIdAndUpdate(
    { _id: bookingId },
    { $set: { price, finishedAt } },
  )

  await ParkingSlot.findByIdAndUpdate(
    { _id: parkingSlotId },
    { $set: { status: ParkingSlotStatus.AVAILABLE } },
  )

  return res.status(201).json({ data: bookingFinished })
}

export { getBookingList }
