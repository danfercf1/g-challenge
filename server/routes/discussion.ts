/* eslint-disable @typescript-eslint/no-explicit-any */
import { Router, Request } from 'express'
import { Response } from '../custom'
import { response } from '../utils'
import { Discussion as DiscussionC } from '../controllers/discussion'
import { DtoDiscussion } from '../dto-interfaces'

const Discussion = Router()

Discussion.route('/discussions/')
  .get(
    async (req: Request, res: Response): Promise<void> => {
      const uc = new DiscussionC()

      try {
        const result = await uc.process('getAll')
        response(false, { result }, res, 200)
      } catch (error: any) {
        console.error(error)
        response(true, { message: error.message }, res, 500)
      }
  })
  .post(
    async (req: Request, res: Response): Promise<void> => {
      const { body } = req

      const uc = new DiscussionC(body as DtoDiscussion)

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
    async (req: Request, res: Response): Promise<void> => {
      const uc = new DiscussionC()

      try {
        const result = await uc.process('deleteAll')
        response(false, { result }, res, 200)
      } catch (error: any) {
        console.error(error)
        response(true, { message: error.message }, res, 500)
      }
  })

Discussion.route('/discussions/:id')
.get(
  async (req: Request, res: Response): Promise<void> => {
    const {
      params: { id }
    } = req
    const dto = {
      id
    }

    const uc = new DiscussionC(dto as DtoDiscussion)

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
      params: { id }
    } = req
    const dto = { id }
    const uc = new DiscussionC(dto as DtoDiscussion)

    try {
      const result = await uc.process('delete')
      response(false, { result }, res, 200)
    } catch (error: any) {
      console.error(error)
      response(true, { message: error.message }, res, 500)
    }
  }
)

Discussion.route('/discussions/:id/comments')
.get(
  async (req: Request, res: Response): Promise<void> => {
    const {
      params: { id }
    } = req
    const dto = {
      id
    }

    const uc = new DiscussionC(dto as DtoDiscussion)

    try {
      const result = await uc.process('getAllComents')
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
      params: { id }
    } = req
    const dto = { id }
    const uc = new DiscussionC(dto as DtoDiscussion)

    try {
      const result = await uc.process('deleteAllComents')
      response(false, { result }, res, 200)
    } catch (error: any) {
      console.error(error)
      response(true, { message: error.message }, res, 500)
    }
  }
)

export { Discussion }
