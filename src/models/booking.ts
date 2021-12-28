import mongoose, { Document, Model, ObjectId, Schema } from 'mongoose'

interface BookingDocument extends Document {
  _id?: ObjectId
  parkingSlotId: ObjectId
  startedAt?: Date
  finishedAt?: Date
  total?: number
  plate: string
}

interface BookingInput {
  _id?: BookingDocument['_id']
  parkingSlotId: BookingDocument['parkingSlotId']
  startedAt?: BookingDocument['startedAt']
  finishedAt?: BookingDocument['finishedAt']
  total?: BookingDocument['total']
  plate: BookingDocument['plate']
}

const bookingSchema = new Schema<BookingDocument>(
  {
    parkingSlotId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    startedAt: {
      type: Date,
      required: false,
    },
    finishedAt: {
      type: Date,
      required: false,
    },
    total: {
      type: Number,
      required: false,
    },
    plate: {
      type: String,
      minLength: 6,
      maxLength: 6,
    },
  },
  {
    collection: 'bookings',
    timestamps: true,
  },
)

const Booking: Model<BookingDocument> = mongoose.model<BookingDocument>('Booking', bookingSchema)

export { Booking, BookingInput, BookingDocument }
