import { Document, model, Schema, Types } from 'mongoose'

interface IComment extends Document {
  _id: Types.ObjectId
  discussion: Types.ObjectId
  parent: Types.ObjectId
  status: string
  text: string
  upvote: number,
  user: string
}

const Comment = new Schema(
  {
    discussion: {
      ref : 'Discussion',
      type: Types.ObjectId
    },
    parent: {
      required: false,
      type    : String
    },
    status: {
      default : 'Active',
      required: true,
      type    : String
    },
    text: {
      required: true,
      type    : String
    },
    upvote: {
      default : 0,
      required: true,
      type    : Number
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

const CommentModel = model<IComment>('Comment', Comment)

export { IComment, CommentModel }
