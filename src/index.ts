import express, { Request, Response } from 'express'
import { bookingRouter } from './routes/booking'
import { parkingRouter } from './routes/parkingSlot'
import './connection'

const app = express()

app.set('port', 3000)
app.use(bookingRouter)
app.use(parkingRouter)

//app.use(express.urlencoded({extended: false}))

// app.use(userRoutes)

app.listen(app.get('port'), () => {
  console.log('Aplicación corriendo en el puerto ' + app.get('port'))
})
