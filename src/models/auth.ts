import { Document } from 'mongoose'

interface IAuth extends Document {
  token: string
}

export { IAuth }
