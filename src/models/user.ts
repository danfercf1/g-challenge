import crypto from 'crypto'
import { Document, model, Schema, Types } from 'mongoose'

interface IUser extends Document {
  _id: Types.ObjectId
  email: string,
  firstName: string,
  lastName: string,
  password: string,
  salt: string,
  setSalt(): void,
  status: string
  validPassword(password: string): string
}

const User = new Schema(
  {
    email: {
      required: true,
      type    : String,
      unique  : true
    },
    firstName: {
      required: true,
      type    : String
    },
    hash: {
      required: true,
      type    : String
    },
    lastName: {
      required: true,
      type    : String
    },
    salt: {
      required: true,
      type    : String
    },
    status: {
      default : 'Active',
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

User.methods.setSalt = function () {
  this.salt = crypto.randomBytes(16).toString('hex')
}

User.methods.validPassword = function (password: string): boolean {
  const hash = crypto.pbkdf2Sync(password, this.salt, 10000, 64, 'SHA512').toString('base64')

  return this.hash === hash
}

User.pre('save', function (): void {
  this.hash = crypto.pbkdf2Sync(this.hash, this.salt, 10000, 64, 'SHA512').toString('base64')
})

const UserModel = model<IUser>('users', User)

export { IUser, UserModel }
