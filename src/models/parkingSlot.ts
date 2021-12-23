import mongoose, { Schema, Model, Document, ObjectId } from 'mongoose'

enum ParkingSlotStatus {
  AVAILABLE = 'available',
  UNAVAILABLE = 'unavailable',
}

interface ParkingSlotDocument extends Document {
  _id?: ObjectId
  name: string
  status: ParkingSlotStatus
}

interface ParkingSlotInput {
  _id?: ParkingSlotDocument['_id']
  name: ParkingSlotDocument['name']
  status: ParkingSlotDocument['status']
}

const parkingSlotSchema = new Schema<ParkingSlotDocument>(
  {
    name: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: ParkingSlotStatus.AVAILABLE,
      enum: Object.values(ParkingSlotStatus),
    },
  },
  {
    collection: 'parkingSlots',
    timestamps: true,
  },
)

const ParkingSlot: Model<ParkingSlotDocument> = mongoose.model<ParkingSlotDocument>(
  'ParkingSlot',
  parkingSlotSchema,
)

export { ParkingSlot, ParkingSlotInput, ParkingSlotDocument }
