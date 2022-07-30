export interface ConversationInfo {
  users: string[]
  group?: {
    admins: string[]
    groupName: null | string
    groupImage: null | string
  }

  seen: {
    [key: string]: string
  }
  updatedAt: {
    seconds: number
    nanoseconds: number
  }
  theme: string
}

export interface UserInfo {
  displayName: string
  email: string
  photoUrl: string
  providerId: string
  uid: string
}
