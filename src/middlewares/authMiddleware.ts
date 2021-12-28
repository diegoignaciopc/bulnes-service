import { Request, Response, NextFunction } from 'express'

const jwt = require('jsonwebtoken')

const accessTokenSecret = 'key8AS90D8SA90'

const authenticateJWT = (req: any, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization

  if (!authHeader)
    return res.status(401).json({ message: 'missing auth header' })

  const token = authHeader.split(' ')[1]

  jwt.verify(token, accessTokenSecret, (err: any, user: any) => {
    if (err) return res.status(403).json({ message: 'invalid token' })
    req.user = user
    next()
  })
}

export { authenticateJWT as authMiddleware }
