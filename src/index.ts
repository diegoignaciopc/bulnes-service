require('@babel/register')({ extensions: ['.js', '.ts'] })

import express from 'express'
import { json } from 'body-parser'
import { bookingRouter } from './routes/booking'
import { parkingRouter } from './routes/parkingSlot'
import { userRouter } from './routes/user'
import './connection'

const app = express()
const PORT = process.env.PORT || 3000

app.use(json())
app.use(bookingRouter)
app.use(parkingRouter)
app.use(userRouter)

// app.use(express.urlencoded({extended: false}))

app.listen(PORT, () => {
  console.log('Aplicación corriendo en el puerto ' + PORT)
})
