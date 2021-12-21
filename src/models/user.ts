import mongoose from 'mongoose'
const Schema = mongoose.Schema

interface User {
  id: string
  name: string
  email: string
  password: string
  dni: string
  phone: number
}
const userSchema = new Schema<User>({
  id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  dni: String,
  phone: Number,
})

const User = mongoose.model('User', userSchema)

export default User
