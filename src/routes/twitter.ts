/* eslint-disable @typescript-eslint/no-explicit-any */
import { Router, Request } from 'express'
import { Response } from '../custom'
import { response } from '../utils'
import { Twitter as TwitterC } from '../controllers/twitter'
import { DtoGhost, DtoTwitter } from '../dto-interfaces'
import { authMiddleware } from '../middlewares'

const Twitter = Router()

Twitter.route('/twitters/')
  .get(
    authMiddleware,
    async (req: Request, res: Response): Promise<void> => {
      const uc = new TwitterC()

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
      const uc = new TwitterC(body as DtoGhost)

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
      const uc = new TwitterC()
      try {
        const result = await uc.process('deleteAll')
        response(false, { result }, res, 200)
      } catch (error: any) {
        console.error(error)
        response(true, { message: error.message }, res, 500)
      }
    }
  )

Twitter.route('/twitters/:twitterId')
  .get(
    authMiddleware,
    async (req: Request, res: Response): Promise<void> => {
      const {
        params: { twitterId }
      } = req
      const dto = {
        id: twitterId
      }

      const uc = new TwitterC(null, dto as DtoTwitter)

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
    authMiddleware,
    async (req: Request, res: Response): Promise<void> => {
      const {
        params: { twitterId }
      } = req
      const dto = { id: twitterId }
      const uc = new TwitterC(null, dto as DtoTwitter)

      try {
        const result = await uc.process('delete')
        response(false, { result }, res, 200)
      } catch (error: any) {
        console.error(error)
        response(true, { message: error.message }, res, 500)
      }
    }
  )

export { Twitter }
