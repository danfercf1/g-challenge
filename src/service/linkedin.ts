import axios, { AxiosInstance, AxiosResponse } from 'axios'
import qs from 'qs'
import { LinkedinAuthResponse, DtoLinkedinPost } from '../dto-interfaces'
import { ILinkedin, ILinkedinUser } from '../models'

class LinkedinService {
  private _requestInstance: AxiosInstance
  private _key: string
  private _secret: string
  private _redirectUrl: string
  private _authorizationURL = 'https://www.linkedin.com/oauth/v2/authorization'
  private _token = ''

  constructor(key: string, secret: string, redirectUrl = '') {
    this._key = key
    this._secret = secret
    this._redirectUrl = redirectUrl
    this._requestInstance = axios.create({
      baseURL: 'https://api.linkedin.com/v2/',
      headers: {
        'X-Restli-Protocol-Version': '2.0.0',
        'cache-control'            : 'no-cache',
        'x-li-format'              : 'json'
      }
    })
  }

  public get token(): string {
    return this._token
  }

  public set token(token: string) {
    this._token = token
  }

  public async setToken(token: string): Promise<void> {
    this._requestInstance.defaults.headers.common.Authorization = `Bearer ${token}`
  }

  public getAuthorizationCode(): string {
    const state = Buffer.from(
      Math.round(Math.random() * Date.now()).toString()
    ).toString('hex')
    const scope = encodeURIComponent(
      'r_liteprofile r_emailaddress w_member_social'
    )
    const key = encodeURIComponent(this._key)
    const redirectUrl = encodeURIComponent(this._redirectUrl)

    return `${this._authorizationURL}?response_type=code&client_id=${key}&redirect_uri=${redirectUrl}&state=${state}&scope=${scope}`
  }

  public async getAuthorizationToken(
    code: string
  ): Promise<LinkedinAuthResponse> {
    const body = {
      client_id    : this._key,
      client_secret: this._secret,
      code         : code,
      grant_type   : 'authorization_code',
      redirect_uri : this._redirectUrl
    }
    try {
      const response: AxiosResponse = await this._requestInstance.post(
        'https://www.linkedin.com/oauth/v2/accessToken',
        qs.stringify(body),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }
      )
      const data = response.data as LinkedinAuthResponse

      return data
    } catch (error: unknown) {
      console.error(error)
      throw new Error('There was a problem trying to get the token')
    }
  }

  private _getUserUrn(userId: string): string {
    return `urn:li:person:${userId}`
  }

  public async publishPost(
    linkedinShare: DtoLinkedinPost
  ): Promise<ILinkedin> {
    const { title, text, shareUrl, shareThumbnailUrl, userId } =
      linkedinShare as DtoLinkedinPost
    const body = {
      content: {
        contentEntities: [
          {
            entityLocation: shareUrl,
            thumbnails    : [
              {
                resolvedUrl: shareThumbnailUrl
              }
            ]
          }
        ],
        title
      },
      owner  : this._getUserUrn(userId),
      subject: title,
      text   : {
        text
      }
    }
    try {
      const endpoint = 'shares'
      const response: AxiosResponse = await this._requestInstance.post(
        endpoint,
        body,
      )

      return response.data as ILinkedin
    } catch (error: unknown) {
      console.error(error)
      throw new Error('There was a problem trying to share')
    }
  }

  public async getUser(): Promise<ILinkedinUser> {
    try {
      const endpoint = 'me'
      const response: AxiosResponse = await this._requestInstance.get(
        endpoint
      )

      return response.data as ILinkedinUser
    } catch (error: unknown) {
      console.error(error)
      throw new Error('There was a problem trying to share')
    }
  }
}

export { LinkedinService }
