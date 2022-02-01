/* eslint-disable @typescript-eslint/no-explicit-any */
import { Router, Request } from 'express'
import { CustomValidator, param, validationResult } from 'express-validator'
import { isValidObjectId } from 'mongoose'
import multer from 'multer'
import { Response } from '../custom'
import { response } from '../utils'
import { Mail as MailC } from '../controllers/mail'
import { DtoMail } from '../dto-interfaces'
import { authMiddleware } from '../middlewares'

const Mail = Router()
const upload = multer()

const checkObjectId: CustomValidator = (value: string) => {
  if (!isValidObjectId(value))
    return Promise.reject('It is not an ObjectId')
  else
    return Promise.resolve(isValidObjectId(value))
}

Mail.route('/mails/')
  .get(
    authMiddleware,
    async (req: Request, res: Response): Promise<void> => {
      const uc = new MailC()

      try {
        const result = await uc.process('getAll')
        response(false, { result }, res, 200)
      } catch (error: any) {
        console.error(error)
        response(true, { message: error.message }, res, 500)
      }
    }
  )
  .post(
    upload.any(), async (req: Request, res: Response): Promise<void> => {
      const { body } = req
      const uc = new MailC(body as DtoMail)

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
      const uc = new MailC()
      try {
        const result = await uc.process('deleteAll')
        response(false, { result }, res, 200)
      } catch (error: any) {
        console.error(error)
        response(true, { message: error.message }, res, 500)
      }
    }
  )

Mail.route('/mails/:mailId')
  .get(
    authMiddleware,
    param('mailId').custom(checkObjectId),
    async (req: Request, res: Response): Promise<void> => {
      const errors = validationResult(req)

      if (!errors.isEmpty())
        return response(true, { errors: errors.array() }, res, 400)

      const {
        params: { mailId }
      } = req
      const dto = {
        id: mailId
      }

      const uc = new MailC(dto as DtoMail)

      try {
        const result = await uc.process('getOne')
        response(false, { result }, res, 200)
      } catch (error: any) {
        console.log(error)
        response(true, { message: error.message }, res, 500)
      }
    }
  )
  .patch(
    authMiddleware,
    param('mailId').custom(checkObjectId),
    async (req: Request, res: Response): Promise<void> => {
      const errors = validationResult(req)

      if (!errors.isEmpty())
        return response(true, { errors: errors.array() }, res, 400)

      const {
        body: { attachments, from, subject, text },
        params: { mailId }
      } = req
      const dto = {
        attachments,
        from,
        id: mailId,
        subject,
        text
      }
      const uc = new MailC(dto as DtoMail)
      try {
        const mail = await uc.process('getOne')
        if (mail) {
          const result = await uc.process('update')
          response(false, { result }, res, 200)
        } else {
          const error = {
            message: 'The id does not exist'
          }
          response(true, { message: error.message }, res, 400)
        }
      } catch (error: any) {
        console.error(error)
        response(true, { message: error.message }, res, 500)
      }
    }
  )
  .delete(
    authMiddleware,
    param('mailId').custom(checkObjectId),
    async (req: Request, res: Response): Promise<void> => {
      const errors = validationResult(req)

      if (!errors.isEmpty())
        return response(true, { errors: errors.array() }, res, 400)

      const {
        params: { mailId }
      } = req
      const dto = { id: mailId }
      const uc = new MailC(dto as DtoMail)

      try {
        const result = await uc.process('delete')
        response(false, { result }, res, 200)
      } catch (error: any) {
        console.error(error)
        response(true, { message: error.message }, res, 500)
      }
    }
  )

export { Mail }
