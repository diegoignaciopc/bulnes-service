import mongoose, { Document, Model, ObjectId, Schema } from 'mongoose'

interface UserDocument extends Document{
  _id?: ObjectId
  name: string
  email: string
  password: string
  dni: string
  phone: number
}
interface UserInput {
  _id: UserDocument['_id']
  name: UserDocument['name']
  email:UserDocument['email']
  password: UserDocument['password']
  dni: UserDocument['dni']
  phone: UserDocument['phone']
}
const userSchema = new Schema<UserDocument>({
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
  dni: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  },
  {
    collection: 'users',
    timestamps: true,
  },
  )

const Users: Model<UserDocument> = mongoose.model<UserDocument>('User', userSchema)

export { Users, UserDocument, UserInput }
