import { Request, Response } from 'express'
import { Users, UserInput } from '../models/user'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

const login = async (req: Request, res: Response) => {
  await Users.findOne({ email: req.body.email }, (err: any, result: any) => {
    if (err) return res.status(400).json({ message: err })

    if (!result)
      return res.status(404).json({ message: 'usuario no encontrado' })

    const passwordsMatch = bcrypt.compareSync(
      req.body.password,
      result.password,
    )

    if (passwordsMatch) {
      jwt.sign(
        {
          uid: result._id,
          email: result.email,
          name: result.name,
          phone: result.phone,
        },
        'key8AS90D8SA90',
        (err: any, token: any) => {
          if (err) return res.status(400).json({ err })
          return res.status(200).json({ token })
        },
      )
    } else {
      return res.status(400).json({ message: 'Contraseña incorrecta' })
    }
  }).clone()
}

const register = async (req: Request, res: Response) => {
  const { name, password, email, dni, phone }: UserInput = req.body

  if (!name || !password || !email || !dni || !phone) {
    return res.status(422).json({
      message: 'The fields name, password, email, dni, phone  are required',
    })
  }

  const existingUser = await Users.findOne({ email })

  if (existingUser) {
    return res
      .status(400)
      .json({ message: 'User email already exist, try with another one.' })
  }

  const user = new Users({
    name,
    password: bcrypt.hashSync(password, 10),
    email,
    dni,
    phone,
  })

  user.save((err) => {
    if (err) return res.status(400).json({ err })
    return res.status(201).json({ message: 'User created successfully' })
  })
}

export { login, register }
