import mongoose from 'mongoose'
const Schema = mongoose.Schema

enum ParkingSlotStatus {
  AVAILABLE = 'available',
  UNAVAILABLE = 'unavailable',
}
interface ParkingSlot {
  id: string
  name: string
  status: ParkingSlotStatus
}
const parkingSlotSchema = new Schema<ParkingSlot>({
  id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: ParkingSlotStatus.AVAILABLE,
    enum: Object.values(ParkingSlotStatus),
  },
})

const ParkingSlot = mongoose.model('ParkingSlot', parkingSlotSchema)

export default ParkingSlot
