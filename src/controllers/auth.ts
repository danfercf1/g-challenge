/* eslint-disable @typescript-eslint/no-explicit-any */
import jwt from 'jsonwebtoken'
import { DtoAuth } from '../dto-interfaces'
import { IAuth, UserModel } from '../models'

class Auth {
  private _args: DtoAuth | null

  constructor(args: DtoAuth | null = null) {
    this._args = args
  }

  process(
    type: string
  ):
    | Promise<IAuth | null>
    | Promise<string | undefined>
    | Promise<any>
    | undefined {
    switch (type) {
      case 'login':
        return this._login()
      default:
        return undefined
    }
  }

  private async _login(): Promise<IAuth> {
    const { email, password } = this._args as DtoAuth
    try {
      const user = await UserModel.findOne({ email: email })

      if (user && user.validPassword(password)) {
        const tokenSecret = process.env.JWT_SECRET_KEY as string
        const token = jwt.sign(
          // eslint-disable-next-line no-underscore-dangle
          { email: user.email, userId: user._id },
          tokenSecret,
          {
            expiresIn: '1h'
          }
        )

        return { token } as IAuth
      } else
        throw new Error('The user is not valid')

    } catch (error: any) {
      console.log(error)
      if (error.response) console.error(error.response.body)
      else if (error.data) console.error(error.data)
      else console.error(error)
      throw new Error('There was a problem trying to sign in the user')
    }
  }
}

export { Auth }
