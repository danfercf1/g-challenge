/* eslint-disable @typescript-eslint/no-explicit-any */
import { Types } from 'mongoose'
import { DtoComment } from '../dto-interfaces'
import { IComment, CommentModel, DiscussionModel } from '../models'
import { namesGenerator } from '../utils'

class Comment {
  private _args: DtoComment | null

  constructor(args: DtoComment | null = null) {
    this._args = args
  }

  process(
    type: string
  ):
    | Promise<IComment[]>
    | Promise<IComment | null>
    | Promise<IComment>
    | Promise<number | undefined>
    | Promise<any>
    | undefined {
    switch (type) {
      case 'deleteAll':
        return this._deleteAll()
      case 'delete':
        return this._delete()
      case 'getAll':
        return this._getAll()
      case 'getOne':
        return this._getOne()
      case 'store':
        return this._store()
      case 'updateUpvote':
        return this._updateUpvote()
      default:
        return undefined
    }
  }

  private async _getOne(): Promise<IComment | null> {
    const { id } = this._args as DtoComment

    try {
      const comment = await CommentModel.findOne({ commentId: id })

      return comment
    } catch (error: any) {
      console.error(error)
      throw new Error(
        'There was a problem trying to get the requested comment.'
      )
    }
  }

  private async _updateUpvote(): Promise<IComment | null> {
    const { id } = this._args as DtoComment

    try {
      const comment = await CommentModel.findByIdAndUpdate(
        id,
        {
          $inc: { upvote: 1 }
        },
        {
          new: true
        }
      ).exec()

      return comment
    } catch (error: any) {
      console.error(error)
      throw new Error(
        'There was a problem trying to get the requested comment.'
      )
    }
  }

  private async _store(): Promise<IComment> {
    const { discussion, parent, status, text, upvote } = this
      ._args as DtoComment
    try {
      const discussionId = new Types.ObjectId(discussion)

      const newComment = new CommentModel({
        discussion: discussionId,
        parent,
        status,
        text,
        upvote,
        user      : namesGenerator()
      })

      const result = await newComment.save()
      await DiscussionModel.findByIdAndUpdate(
        discussionId,
        {
          $push: { comments: new Types.ObjectId(result.id) }
        },
        { upsert: true }
      ).exec()

      return result
    } catch (error: any) {
      console.log(error)
      if (error.response) console.error(error.response.body)
      else if (error.data) console.error(error.data)
      else console.error(error)
      throw new Error('There was a problem trying to store the comment.')
    }
  }

  private async _delete(): Promise<IComment | null> {
    const { id } = this._args as DtoComment

    try {
      const deletedComment = await CommentModel.findOneAndRemove({
        id: id
      })

      return deletedComment
    } catch (error) {
      console.error(error)
      throw new Error(
        'There was a error trying to delete the requested comment.'
      )
    }
  }

  private async _deleteAll() {
    try {
      const deletedComments = await CommentModel.deleteMany({})

      return deletedComments
    } catch (error: any) {
      console.error(error)
      throw new Error('THere was a error trying to delete all the comments.')
    }
  }

  private async _getAll(): Promise<IComment[]> {
    try {
      const comments = await CommentModel.find({}).populate('discussion')

      return comments
    } catch (error: any) {
      console.error(error)
      throw new Error('There was a problem trying to get all the comments.')
    }
  }
}

export { Comment }
