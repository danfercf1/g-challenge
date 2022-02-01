interface DtoLinkedinPost {
  shareThumbnailUrl: string
  shareUrl: string
  text: string
  title: string
  userId: string
}

interface DtoLinkedin {
  id: string
}

interface DtoLinkedinCode {
  code: string
}

interface LinkedinAuthResponse {
  access_token: string
  expires_in: string
}

export {
  DtoLinkedin,
  DtoLinkedinPost,
  LinkedinAuthResponse,
  DtoLinkedinCode
}
