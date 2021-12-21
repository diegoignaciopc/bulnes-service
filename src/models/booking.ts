import mongoose from 'mongoose'
const Schema = mongoose.Schema

interface Booking {
  id: string
  place: string
  startDate: string
  endDate: string
  price: string
  plate: string
}
const bookingSchema = new Schema<Booking>({
  id: {
    type: String,
    required: true,
  },
  place: {
    type: String,
    required: true,
  },
  startDate: String,
  endDate: String,
  price: {
    type: String,
    required: true,
  },
  plate: {
    type: String,
    minLength: 6,
    maxLength: 6,
  },
})

const Booking = mongoose.model('Booking', bookingSchema)

export default Booking
