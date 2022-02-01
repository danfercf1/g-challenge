/* eslint-disable @typescript-eslint/no-explicit-any */
import { DtoUser } from '../dto-interfaces'
import { IUser, UserModel } from '../models'

class User {
  private _args: DtoUser | null

  constructor(args: DtoUser | null = null) {
    this._args = args
  }

  process(
    type: string
  ):
    | Promise<IUser[]>
    | Promise<IUser | null>
    | Promise<IUser>
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

  private async _getOne(): Promise<IUser | null> {
    const { id } = this._args as DtoUser

    try {
      const tweet = await UserModel.findOne({ tweetId: id })

      return tweet
    } catch (error: any) {
      console.error(error)
      throw new Error('There was a problem trying to get the requested user.')
    }
  }

  private async _store(): Promise<IUser> {
    const { email, firstName, lastName, password } = this._args as DtoUser
    try {
      const newUser = new UserModel({
        email,
        firstName,
        hash: password,
        lastName
      })

      newUser.setSalt()

      const result = await newUser.save()

      return result
    } catch (error: any) {
      console.log(error)
      if (error.response) console.error(error.response.body)
      else if (error.data) console.error(error.data)
      else console.error(error)
      throw new Error('There was a problem trying to store the user.')
    }
  }

  private async _delete(): Promise<IUser | null> {
    const { id } = this._args as DtoUser

    try {
      const deletedUser = await UserModel.findOneAndRemove({ userId: id })

      return deletedUser
    } catch (error) {
      console.error(error)
      throw new Error('There was a error trying to delete the requested user.')
    }
  }

  private async _deleteAll() {
    try {
      const deletedUsers = await UserModel.deleteMany({})

      return deletedUsers
    } catch (error: any) {
      console.error(error)
      throw new Error('THere was a error trying to delete all the users.')
    }
  }

  private async _getAll(): Promise<IUser[]> {
    try {
      const users = await UserModel.find({})

      return users
    } catch (error: any) {
      console.error(error)
      throw new Error('There was a problem trying to get all the users.')
    }
  }
}

export { User }
