/* eslint-disable @typescript-eslint/no-explicit-any */
import { Router, Request } from 'express'
import { Response } from '../custom'
import { response } from '../utils'
import { Linkedin as LinkedinC } from '../controllers/linkedin'
import { DtoGhost, DtoLinkedinCode, DtoLinkedin } from '../dto-interfaces'
import { authMiddleware } from '../middlewares'

const Linkedin = Router()

Linkedin.route('/linkedins/')
  .get(
    authMiddleware,
    async (req: Request, res: Response): Promise<void> => {
      const uc = new LinkedinC()

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
    async (req: Request, res: Response): Promise<void> => {
      const { body } = req
      const uc = new LinkedinC(body as DtoGhost)

      try {
        const result = await uc.process('store')
        response(false, { result }, res, 201)
      } catch (error: any) {
        console.error(error)
        response(true, { message: error.message }, res, 500)
      }
    }
  )

Linkedin.route('/linkedins/auth')
  .get(
    async (req: Request, res: Response): Promise<void> => {
      const uc = new LinkedinC()
      try {
        const url = await uc.process('auth')

        response(false, { url }, res, 200)
      } catch (err) {
        res.json(err)
      }
    }
  )

Linkedin.route('/linkedins/tokens')
  .get(
    authMiddleware,
    async (req: Request, res: Response): Promise<void> => {
      const uc = new LinkedinC()

      try {
        const result = await uc.process('getAllTokens')
        response(false, { result }, res, 200)
      } catch (error: any) {
        console.error(error)
        response(true, { message: error.message }, res, 500)
      }
    }
  )

Linkedin.route('/linkedins/auth/callback')
  .get(
    async (req: Request, res: Response): Promise<void> => {
      const {
        query: { code }
      } = req
      const dto = {
        code
      }

      const uc = new LinkedinC(null, null , dto as DtoLinkedinCode)

      try {
        const savedToken = await uc.process('callback')

        response(false, { savedToken }, res, 200)
      } catch (error: any) {
        console.error(error)
        response(true, { message: error.message }, res, 500)
      }
    }
  )

Linkedin.route('/linkedins/:linkedinId')
  .get(
    authMiddleware,
    async (req: Request, res: Response): Promise<void> => {
      const {
        params: { linkedinId }
      } = req
      const dto = {
        id: linkedinId
      }

      const uc = new LinkedinC(null, dto as DtoLinkedin)

      try {
        const result = await uc.process('getOne')
        response(false, { result }, res, 200)
      } catch (error: any) {
        console.log(error)
        response(true, { message: error.message }, res, 500)
      }
    }
  )

export { Linkedin }
