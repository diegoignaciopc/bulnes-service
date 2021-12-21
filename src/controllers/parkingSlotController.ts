import express, { Request, Response } from 'express'

const getParkingSlotList = (req: Request, res: Response) => {
  console.log('El booking')
  return res.json([
    { parkingSlotId: 1, name: 'Primero' },
    { parkingSlotId: 1, name: 'Segundo' },
    { parkingSlotId: 1, name: 'Tercero' },
  ])
}
export default { getParkingSlotList }