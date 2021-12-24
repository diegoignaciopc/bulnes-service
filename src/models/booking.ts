import mongoose, { Document, Model, ObjectId, Schema } from 'mongoose'

interface BookingDocument extends Document {
  _id?: ObjectId
  parkingSlotId: ObjectId
  startedAt: Date
  finishedAt?: Date
  price?: number
  plate: string
}

interface BookingInput {
  _id?: BookingDocument['_id']
  parkingSlotId: BookingDocument['parkingSlotId']
  startedAt: BookingDocument['startedAt']
  finishedAt?: BookingDocument['finishedAt']
  price?: BookingDocument['price']
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
      required: true,
    },
    finishedAt: {
      type: Date,
      required: false,
    },
    price: {
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
