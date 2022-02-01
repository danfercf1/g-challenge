interface GhostPostCurrent {
  excerpt: string
  feature_image: string
  id: string
  plaintext: string
  published_at: string
  reading_time: number
  slug: string
  status: string
  title: string
  url: string
  uuid: string
}

interface GhostPost {
  current: GhostPostCurrent
}

interface DtoGhost {
  post: GhostPost
}

export { DtoGhost }
