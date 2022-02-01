/* eslint-disable @typescript-eslint/no-explicit-any */
import { LinkedinService } from '../service'
import { DtoGhost, DtoLinkedin, DtoLinkedinCode, LinkedinAuthResponse, DtoLinkedinPost } from '../dto-interfaces'
import { ILinkedin, ILinkedinAuth, LinkedinAuthModel, LinkedinModel } from '../models'

class Linkedin {
  private _argsGhost: DtoGhost | null
  private _argsLinkedin: DtoLinkedin | null
  private _argsLinkedinCode: DtoLinkedinCode | null
  private _linkedinClient: LinkedinService
  private _key: string
  private _secret: string
  private _redirectUrl: string

  constructor(
    argsGhost: DtoGhost | null = null,
    argsLinkedin: DtoLinkedin | null = null,
    argsLinkedinCode: DtoLinkedinCode | null = null,
  ) {
    this._argsGhost = argsGhost
    this._argsLinkedin = argsLinkedin
    this._argsLinkedinCode = argsLinkedinCode
    this._key = process.env.LINKEDIN_KEY as string
    this._secret = process.env.LINKEDIN_SECRET as string
    this._redirectUrl = process.env.LINKEDIN_REDIRECT_URL as string
    this._linkedinClient = new LinkedinService(
      this._key,
      this._secret,
      this._redirectUrl
    )
  }

  process(
    type: string
  ):
    | Promise<ILinkedin[]>
    | Promise<ILinkedin | null>
    | Promise<ILinkedinAuth[]>
    | Promise<ILinkedinAuth | null>
    | Promise<ILinkedin>
    | Promise<number | undefined>
    | Promise<any>
    | undefined {
    switch (type) {
      case 'getAll':
        return this._getAll()
      case 'getOne':
        return this._getOne()
      case 'store':
        return this._store()
      case 'auth':
        return this._auth()
      case 'callback':
        return this._callback()
      case 'getAllTokens':
        return this._getAllTokens()
      default:
        return undefined
    }
  }

  // eslint-disable-next-line class-methods-use-this
  private async _getAll(): Promise<ILinkedin[]> {
    try {
      const tokens = await LinkedinModel.find({})

      return tokens
    } catch (error: any) {
      console.error(error)
      throw new Error('There was a problem trying to get all the tokens')
    }
  }

  private async _getOne(): Promise<ILinkedin | null> {
    const { id } = this._argsLinkedin as DtoLinkedin

    try {
      const linkedinPost = await LinkedinModel.findOne({ linkedinId: id })

      return linkedinPost
    } catch (error: any) {
      console.error(error)
      throw new Error('There was a problem trying to get the requested a Linkedin post')
    }
  }

  private async _store(): Promise<ILinkedin> {
    const {
      post: {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        current: { url, title, feature_image }
      }
    } = this._argsGhost as DtoGhost
    try {
      const authToken = await LinkedinAuthModel.find({}).limit(1).sort([['createdAt', -1]])
      const token = authToken[0].token
      await this._linkedinClient.setToken(token)
      const linkedinUser = await this._linkedinClient.getUser()
      const postToPublish: DtoLinkedinPost = {
        shareThumbnailUrl: feature_image,
        shareUrl         : url,
        text             : title,
        title,
        userId           : linkedinUser.id
      }
      const postPublished = await this._linkedinClient.publishPost(
        postToPublish
      )

      const newToken = new LinkedinModel(postPublished)

      const result = await newToken.save()

      return result
    } catch (error: any) {
      console.log(error)
      if (error.response) console.error(error.response.body)
      else if (error.data) console.error(error.data)
      else console.error(error)
      throw new Error('There was a problem trying to store the tweet')
    }
  }

  private async _auth(): Promise<string> {
    try {
      const url = this._linkedinClient.getAuthorizationCode()

      return url
    } catch (error: any) {
      console.log(error)
      if (error.response) console.error(error.response.body)
      else if (error.data) console.error(error.data)
      else console.error(error)
      throw new Error('There was a problem trying to store the tweet')
    }
  }

  private async _callback(): Promise<ILinkedinAuth> {
    const { code } = this._argsLinkedinCode as DtoLinkedinCode
    try {
      const token: LinkedinAuthResponse =
        await this._linkedinClient.getAuthorizationToken(code)

      const newToken = new LinkedinAuthModel({
        expirationTime: token.expires_in,
        token         : token.access_token
      })

      const result = await newToken.save()

      return result
    } catch (error: any) {
      console.log(error)
      if (error.response) console.error(error.response.body)
      else if (error.data) console.error(error.data)
      else console.error(error)
      throw new Error('There was a problem trying to store the tweet')
    }
  }

  // eslint-disable-next-line class-methods-use-this
  private async _getAllTokens(): Promise<ILinkedinAuth[]> {
    try {
      const tokens = await LinkedinAuthModel.find({})

      return tokens
    } catch (error: any) {
      console.error(error)
      throw new Error('There was a problem trying to get all the tokens')
    }
  }
}

export { Linkedin }
