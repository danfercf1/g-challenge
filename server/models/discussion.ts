import { Document, model, Schema, Types } from 'mongoose'
import { IComment } from '.'

interface IDiscussion extends Document {
  _id: Types.ObjectId
  comments: Array<IComment>
  status: string
  subject: string
  user: string
}

const Discussion = new Schema(
  {
    comments: [
      {
        ref    : 'Comment',
        require: true,
        type   : Types.ObjectId
      }
    ],
    status: {
      default : 'Active',
      required: true,
      type    : String
    },
    subject: {
      required: true,
      type    : String
    },
    user: {
      required: true,
      type    : String
    }
  },
  {
    timestamps: {
      createdAt: true,
      updatedAt: true
    }
  }
)

const DiscussionModel = model<IDiscussion>('Discussion', Discussion)

export { IDiscussion, DiscussionModel }
