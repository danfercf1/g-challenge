/* eslint-disable @typescript-eslint/no-explicit-any */
import { Router, Request } from 'express'
import { Response } from '../custom'
import { response } from '../utils'
import { Comment as CommentC } from '../controllers/comment'
import { DtoComment } from '../dto-interfaces'

const Comment = Router()

Comment.route('/comments/')
  .get(
    async (req: Request, res: Response): Promise<void> => {
      const uc = new CommentC()

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

      const uc = new CommentC(body as DtoComment)

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
      const uc = new CommentC()

      try {
        const result = await uc.process('deleteAll')
        response(false, { result }, res, 200)
      } catch (error: any) {
        console.error(error)
        response(true, { message: error.message }, res, 500)
      }
  })

Comment.route('/comments/:id')
.get(
  async (req: Request, res: Response): Promise<void> => {
    const {
      params: { id }
    } = req
    const dto = {
      id
    }

    const uc = new CommentC(dto as DtoComment)

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
    const uc = new CommentC(dto as DtoComment)

    try {
      const result = await uc.process('delete')
      response(false, { result }, res, 200)
    } catch (error: any) {
      console.error(error)
      response(true, { message: error.message }, res, 500)
    }
  }
)

Comment.route('/comments/:id/upvote')
.patch(
  async (req: Request, res: Response): Promise<void> => {
    const {
      params: { id }
    } = req
    const dto = {
      id
    }

    const uc = new CommentC(dto as DtoComment)

    try {
      const result = await uc.process('updateUpvote')
      response(false, { result }, res, 200)
    } catch (error: any) {
      console.log(error)
      response(true, { message: error.message }, res, 500)
    }
  }
)

export { Comment }
