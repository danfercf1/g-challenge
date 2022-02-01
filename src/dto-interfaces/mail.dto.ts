interface DtoMail {
  attachments: Array<string>,
  from: string,
  fromEmail: string,
  html: string,
  id       : string,
  resend       : boolean,
  subject: string
  text: string
  to: string
}

export { DtoMail }
