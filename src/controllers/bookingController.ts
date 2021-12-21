import express, { Request, Response } from 'express'

const getBookingList = (req: Request, res: Response) => {
  console.log('El booking')
  return res.json([
    { parkingSlotId: 1, price: 12000 },
    { parkingSlotId: 1, name: 13000 },
    { parkingSlotId: 1, name: 1000 },
  ])
}
export default { getBookingList }