import { NextFunction, Response, Request } from 'express'
import * as jwt from 'jsonwebtoken'

const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): NextFunction | unknown => {
  const token = req.headers.authorization as string
  const tokenSecret = process.env.JWT_SECRET_KEY as string

  try {
    const jwtPayload = jwt.verify(token, tokenSecret)
    if (jwtPayload) next()
  } catch (error: unknown) {
    res.status(401).send()

    return
  }
}

export { authMiddleware }
