/* eslint-disable @typescript-eslint/no-explicit-any */
import { Client } from '@sendgrid/client'
import sgMail, { MailService } from '@sendgrid/mail'
import { DtoMail } from '../dto-interfaces'
import { IMail, MailModel } from '../models'

class Mail {
  private _args: DtoMail | null
  private _sendGrid: MailService = sgMail

  constructor(args: DtoMail | null = null) {
    this._args = args
    this._sendGrid.setClient(new Client())
    this._sendGrid.setApiKey(process.env.SENDGRID_API_KEY as string)
    this._sendGrid.setSubstitutionWrappers('{{', '}}')
  }

  process(
    type: string
  ):
    | Promise<IMail[]>
    | Promise<IMail | null>
    | Promise<IMail>
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
      case 'update':
        return this._update()
      default:
        return undefined
    }
  }

  private async _delete(): Promise<IMail | null> {
    const { id } = this._args as DtoMail

    try {
      const deletedMail = await MailModel.findByIdAndRemove(id)

      return deletedMail
    } catch (error) {
      console.error(error)
      throw new Error('There was a error trying to delete the requested mail')
    }
  }

  // eslint-disable-next-line class-methods-use-this
  private async _deleteAll() {
    try {
      const deletedMails = await MailModel.deleteMany({})

      return deletedMails
    } catch (error: any) {
      console.error(error)
      throw new Error('THere was a error trying to delete all the mails.')
    }
  }

  // eslint-disable-next-line class-methods-use-this
  private async _getAll(): Promise<IMail[]> {
    try {
      const mails = await MailModel.find({})

      return mails
    } catch (error: any) {
      console.error(error)
      throw new Error('There was a problem trying to get all the mails')
    }
  }

  private async _getOne(): Promise<IMail | null> {
    const { id } = this._args as DtoMail

    try {
      const mail = await MailModel.findById(id)

      return mail
    } catch (error: any) {
      console.error(error)
      throw new Error('There was a problem trying to get the requested mail')
    }
  }

  private async _store(): Promise<IMail> {
    const { attachments, from, html, subject, text, to } = this._args as DtoMail
    const sendEmail = process.env.SEND_EMAIL as string | '0'
    try {
      if (!from) throw new Error('From is required')
      if (!subject) throw new Error('Subject is required')
      if (!text) throw new Error('Text is required')

      const regex = /<(.*)>/g
      const matches = regex.exec(from)
      const fromEmail = matches !== null ? matches[1] : ''

      const newMail = new MailModel({
        attachments,
        from,
        fromEmail,
        html,
        subject,
        text,
        to
      })

      const result = await newMail.save()
      const addSenderToHtml = html.concat(`<br> <br> This email was sent from ${from} with the email ${fromEmail}`)
      const toEmail = process.env.RESEND_EMAIL_TO as string
      if (sendEmail === '1')
        await this._sendGrid.send({
          from: to,
          html: addSenderToHtml,
          subject,
          text,
          to  : toEmail
        })

      return result
    } catch (error: any) {
      if (error.response)
        console.error(error.response.body)
      else
        console.error(error)
      throw new Error('There was a problem trying to store the mail')
    }
  }

  private async _update(): Promise<IMail | null> {
    const { id, attachments, from, subject, text } = this._args as DtoMail

    try {
      const updatedMail = await MailModel.findByIdAndUpdate(
        id,
        { attachments, from, subject, text },
        { new: true }
      )

      return updatedMail
    } catch (error: any) {
      if (error.message === 'From must be provided.') throw error
      else {
        console.error(error)
        throw new Error(
          'There was a problem trying to update the requested mail'
        )
      }
    }
  }
}

export { Mail }
