import { Document, model, Schema } from 'mongoose'

interface ILinkedinShareText extends Document {
  text: string
}

interface ILinkedinProfilePicture extends Document {
  displayImage: string
}

interface ILinkedin extends Document {
  edited: boolean,
  id: string,
  owner: string,
  subject: string,
  text: ILinkedinShareText
}

interface ILinkedinAuth extends Document {
  expirationTime: number,
  token: string
}

interface ILinkedinUser extends Document {
  id: string,
  localizedFirstName: string,
  localizedHeadline: string,
  localizedLastName: string,
  profilePicture: {
    displayImage: ILinkedinProfilePicture
  },
  vanityName: string
}

const Linkedin = new Schema(
  {
   edited: {
      required: true,
      type    : String
    },
    id: {
      required: true,
      type    : String
    },
    owner: {
      required: true,
      type    : String
    },
    subject: {
      required: true,
      type    : String
    },
    text: {
      required: true,
      type    : Object
    }
  },
  {
    timestamps: {
      createdAt: true,
      updatedAt: true
    }
  }
)

const LinkedinAuth = new Schema(
  {
    expirationTime: {
      required: true,
      type    : Number
    },
    token: {
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

const LinkedinModel = model<ILinkedin>('linkedin', Linkedin)
const LinkedinAuthModel = model<ILinkedinAuth>('linkedinAuth', LinkedinAuth)

export {
  ILinkedin,
  LinkedinModel,
  LinkedinAuthModel,
  ILinkedinAuth,
  ILinkedinUser
}
