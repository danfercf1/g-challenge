/* eslint-disable @typescript-eslint/no-explicit-any */
import { TwitterApi } from 'twitter-api-v2'
import { DtoGhost, DtoTwitter } from '../dto-interfaces'
import { ITwitter, TwitterModel } from '../models'

class Twitter {
  private _argsGhost: DtoGhost | null
  private _argsTwitter: DtoTwitter | null
  private _twitterClient
  private _key: string
  private _secret: string
  private _accessToken: string
  private _accessSecret: string

  constructor(
    argsGhost: DtoGhost | null = null,
    argsTwitter: DtoTwitter | null = null
  ) {
    this._argsGhost = argsGhost
    this._argsTwitter = argsTwitter
    this._key = process.env.TWITTER_KEY as string
    this._secret = process.env.TWITTER_SECRET as string
    this._accessToken = process.env.TWITTER_ACCESS_TOKEN as string
    this._accessSecret = process.env.TWITTER_ACCESS_SECRET as string
    this._twitterClient = new TwitterApi({
      accessSecret: this._accessSecret,
      accessToken : this._accessToken,
      appKey      : this._key,
      appSecret   : this._secret
    })
  }

  process(
    type: string
  ):
    | Promise<ITwitter[]>
    | Promise<ITwitter | null>
    | Promise<ITwitter>
    | Promise<number | undefined>
    | Promise<any>
    | undefined {
    switch (type) {
      case 'delete':
        return this._delete()
      case 'deleteAll':
        return this._deleteAll()
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

  private async _delete(): Promise<ITwitter | null> {
    const { id } = this._argsTwitter as DtoTwitter

    try {
      const deletedTweet = await TwitterModel.findOneAndRemove({ tweetId: id })

      return deletedTweet
    } catch (error) {
      console.error(error)
      throw new Error('There was a error trying to delete the requested tweet')
    }
  }

  // eslint-disable-next-line class-methods-use-this
  private async _deleteAll() {
    try {
      const deletedTweets = await TwitterModel.deleteMany({})

      return deletedTweets
    } catch (error: any) {
      console.error(error)
      throw new Error('THere was a error trying to delete all the tweets.')
    }
  }

  // eslint-disable-next-line class-methods-use-this
  private async _getAll(): Promise<ITwitter[]> {
    try {
      const tweets = await TwitterModel.find({})

      return tweets
    } catch (error: any) {
      console.error(error)
      throw new Error('There was a problem trying to get all the tweets')
    }
  }

  private async _getOne(): Promise<ITwitter | null> {
    const { id } = this._argsTwitter as DtoTwitter

    try {
      const tweet = await TwitterModel.findOne({ tweetId: id })

      return tweet
    } catch (error: any) {
      console.error(error)
      throw new Error('There was a problem trying to get the requested tweet')
    }
  }

  private async _store(): Promise<ITwitter> {
    const {
      post: {
        current: { url, title }
      }
    } = this._argsGhost as DtoGhost
    try {
      const tweet = await this._twitterClient.v2.tweet(`${title} ${url}`)
      const {
        data: { id }
      } = tweet
      const newTweet = new TwitterModel({
        text   : title,
        tweetId: id
      })

      const result = await newTweet.save()

      return result
    } catch (error: any) {
      console.log(error)
      if (error.response) console.error(error.response.body)
      else if (error.data) console.error(error.data)
      else console.error(error)
      throw new Error('There was a problem trying to store the tweet')
    }
  }
}

export { Twitter }
