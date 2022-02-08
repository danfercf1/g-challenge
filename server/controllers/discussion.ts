/* eslint-disable @typescript-eslint/no-explicit-any */
import { Types } from 'mongoose'
import { DtoDiscussion } from '../dto-interfaces'
import { IDiscussion, DiscussionModel } from '../models'

class Discussion {
  private _args: DtoDiscussion | null

  constructor(args: DtoDiscussion | null = null) {
    this._args = args
  }

  process(
    type: string
  ):
    | Promise<IDiscussion[]>
    | Promise<IDiscussion | null>
    | Promise<IDiscussion>
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
      default:
        return undefined
    }
  }

  private async _getOne(): Promise<IDiscussion | null> {
    const { id } = this._args as DtoDiscussion

    try {
      const discussion = await DiscussionModel.findOne({
        _id: new Types.ObjectId(id)
      }).populate('comments')

      return discussion
    } catch (error: any) {
      console.error(error)
      throw new Error(
        'There was a problem trying to get the requested discussion.'
      )
    }
  }

  private async _store(): Promise<IDiscussion> {
    const { subject, status, user } = this._args as DtoDiscussion
    try {
      const newDiscussion = new DiscussionModel({
        status,
        subject,
        user
      })

      const result = await newDiscussion.save()

      return result
    } catch (error: any) {
      console.log(error)
      if (error.response) console.error(error.response.body)
      else if (error.data) console.error(error.data)
      else console.error(error)
      throw new Error('There was a problem trying to store the discussion.')
    }
  }

  private async _delete(): Promise<IDiscussion | null> {
    const { id } = this._args as DtoDiscussion

    try {
      const deletedDiscussion = await DiscussionModel.findOneAndRemove({
        id: id
      })

      return deletedDiscussion
    } catch (error) {
      console.error(error)
      throw new Error(
        'There was a error trying to delete the requested discussion.'
      )
    }
  }

  private async _deleteAll() {
    try {
      const deletedDiscussions = await DiscussionModel.deleteMany({})

      return deletedDiscussions
    } catch (error: any) {
      console.error(error)
      throw new Error('THere was a error trying to delete all the discussions.')
    }
  }

  private async _getAll(): Promise<IDiscussion[]> {
    try {
      const discussions = await DiscussionModel.find({}).populate({
        options: { retainNullValues: true },
        path   : 'comments'
      })

      return discussions
    } catch (error: any) {
      console.error(error)
      throw new Error('There was a problem trying to get all the discussions.')
    }
  }
}

export { Discussion }
