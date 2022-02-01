/* eslint-disable @typescript-eslint/no-explicit-any */
import { Router, Request } from 'express'
import { body as bodyValidator, validationResult, CustomValidator } from 'express-validator'
import { Response } from '../custom'
import { response } from '../utils'
import { User as UserC } from '../controllers/user'
import { UserModel } from '../models'
import { DtoUser } from '../dto-interfaces'
import { authMiddleware } from '../middlewares'

const User = Router()

const checkUnique: CustomValidator = async (value: string) => {
  const user = await UserModel.findOne({ email: value })
  if (user !== null)
    return Promise.reject('The email must be unique')
  else
    return Promise.resolve(true)
}

User.route('/users/')
  .get(
    authMiddleware,
    async (req: Request, res: Response): Promise<void> => {
      const uc = new UserC()

      try {
        const result = await uc.process('getAll')
        response(false, { result }, res, 200)
      } catch (error: any) {
        console.error(error)
        response(true, { message: error.message }, res, 500)
      }
  })//TODO Add another control to reject another users registration
  .post(
    bodyValidator('email').isEmail().custom(checkUnique),
    bodyValidator('firstName').isString().notEmpty(),
    bodyValidator('lastName').isString().notEmpty(),
    bodyValidator('password').isStrongPassword(),
    async (req: Request, res: Response): Promise<void> => {
      const { body } = req

      const errors = validationResult(req)

      if (!errors.isEmpty())
        return response(true, { errors: errors.array() }, res, 400)

      const uc = new UserC(body as DtoUser)

      try {
        const result = await uc.process('store')
        response(false, { result }, res, 201)
      } catch (error: any) {
        console.error(error)
        response(true, { message: error.message }, res, 500)
      }
    }
  )
  .delete(
    authMiddleware,
    async (req: Request, res: Response): Promise<void> => {
      const uc = new UserC()

      try {
        const result = await uc.process('deleteAll')
        response(false, { result }, res, 200)
      } catch (error: any) {
        console.error(error)
        response(true, { message: error.message }, res, 500)
      }
  })

User.route('/users/:userId')
.get(
  async (req: Request, res: Response): Promise<void> => {
    const {
      params: { userId }
    } = req
    const dto = {
      id: userId
    }

    const uc = new UserC(dto as DtoUser)

    try {
      const result = await uc.process('getOne')
      response(false, { result }, res, 200)
    } catch (error: any) {
      console.log(error)
      response(true, { message: error.message }, res, 500)
    }
  }
)
.delete(
  async (req: Request, res: Response): Promise<void> => {
    const {
      params: { userId }
    } = req
    const dto = { id: userId }
    const uc = new UserC(dto as DtoUser)

    try {
      const result = await uc.process('delete')
      response(false, { result }, res, 200)
    } catch (error: any) {
      console.error(error)
      response(true, { message: error.message }, res, 500)
    }
  }
)

export { User }
