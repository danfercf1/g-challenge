/* eslint-disable @typescript-eslint/no-explicit-any */
import { Router, Request } from 'express'
import { body as bodyValidator, validationResult } from 'express-validator'
import { Response } from '../custom'
import { response } from '../utils'
import { Auth as AuthC } from '../controllers/auth'
import { DtoAuth } from '../dto-interfaces'

const Auth = Router()

Auth.route('/auth/')
  .post(
    bodyValidator('email').isEmail(),
    bodyValidator('password').isString(),
    async (req: Request, res: Response): Promise<void> => {
      const { body } = req

      const errors = validationResult(req)

      if (!errors.isEmpty())
        return response(true, { errors: errors.array() }, res, 400)

      const uc = new AuthC(body as DtoAuth)

      try {
        const result = await uc.process('login')
        response(false, { result }, res, 201)
      } catch (error: any) {
        console.error(error)
        response(true, { message: error.message }, res, 500)
      }
    }
  )

export { Auth }
