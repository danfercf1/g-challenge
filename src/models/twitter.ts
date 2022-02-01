import { Document, model, Schema } from 'mongoose'

interface ITwitter extends Document {
  text: string,
  tweetId: string
}

const Twitter = new Schema(
  {
    text: {
      required: true,
      type    : String
    },
    tweetId: {
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

const TwitterModel = model<ITwitter>('twitters', Twitter)

export { ITwitter, TwitterModel }
