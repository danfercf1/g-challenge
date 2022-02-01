import { Document, model, Schema } from 'mongoose'

interface IMail extends Document {
  attachments: Array<string>
  from: string
  fromEmail: string
  html: string
  resend: boolean
  subject: string
  text: string
  to: string
}

const Mail = new Schema(
  {
    attachments: {
      required: false,
      type    : Array
    },
    from: {
      required: true,
      type    : String
    },
    fromEmail: {
      required: true,
      type    : String
    },
    html: {
      required: true,
      type    : String
    },
    resend: {
      default : false,
      required: false,
      type    : Boolean
    },
    subject: {
      required: true,
      type    : String
    },
    text: {
      required: true,
      type    : String
    },
    to: {
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

const MailModel = model<IMail>('mails', Mail)

export { IMail, MailModel }
