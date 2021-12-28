import { Request, Response } from 'express'
import { Booking, BookingInput } from '../models/booking'
import { ParkingSlot, ParkingSlotStatus } from '../models/parkingSlot'
import * as config from './../config'

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

export const finishBooking = async (req: Request, res: Response) => {
  const { bookingId } = req.params

  if (!bookingId) {
    return res.status(422).json({ message: 'The field bookingId is required' })
  }

  try {
    const booking = await Booking.findOne({ _id: bookingId })
    if (!booking) {
      return res
        .status(404)
        .json({ message: `Booking ID: ${bookingId} not found` })
    }
    return res.status(201).json({ data: booking })
  } catch (err: any) {
    console.error(err.message)
    return res.status(400).json({ message: 'an error has ocurred' })
  }

  /*const bookingFinished = await Booking.findByIdAndUpdate(
    { _id: bookingId },
    { $set: { total, finishedAt: new Date() } },
  )

  await ParkingSlot.findByIdAndUpdate(
    { _id: parkingSlotId },
    { $set: { status: ParkingSlotStatus.AVAILABLE } },
  )*/
}

export { getBookingList }
