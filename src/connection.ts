import mongoose from 'mongoose'

const connection = mongoose
  .connect(
    'mongodb://localhost:27017/bulnes',
  )
  .then((db) => {
    console.log('Conexión exitosa')
  })
  .catch((err) => {
    console.log('Ha ocurrido un error al conectarse ' + err)
  })

export default connection


// 'mongodb+srv://bulnes:bulnes@clusterbulnes.xhdrj.mongodb.net/bulnes?retryWrites=true&w=majority',