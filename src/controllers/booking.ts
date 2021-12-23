import { Request, Response } from 'express'
import { Booking, BookingInput } from '../models/booking'

const getBookingList = async (req: Request, res: Response) => {
  const bookings = await Booking.find().exec()

  return res.status(200).json({ data: bookings })
}

export const createBooking = async (req: Request, res: Response) => {
  const { parkingSlotId, plate, price, startedAt, finishedAt }: BookingInput = req.body

  if (!parkingSlotId || !plate || !price || !startedAt || !finishedAt) {
    return res.status(422).json({
      message: 'The fields parkingSlotId, plate, price, startedAt and finishedAt are required',
    })
  }

  const bookingCreated = await Booking.create<BookingInput>({
    parkingSlotId,
    plate,
    price,
    startedAt,
    finishedAt,
  })

  return res.status(201).json({ data: bookingCreated })
}

export { getBookingList }
