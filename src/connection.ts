import mongoose from 'mongoose'

const credentials = 'bulnes'

const connection = mongoose
  .connect(
    `mongodb+srv://${credentials}:${credentials}@clusterbulnes.xhdrj.mongodb.net/${credentials}?retryWrites=true&w=majority`,
  )
  .then((db) => {
    console.log('Conexión exitosa')
  })
  .catch((err) => {
    console.log('Ha ocurrido un error al conectarse ' + err)
  })

export default connection
