export type FormField = 'email' | 'nickname' | 'password' | 'confirmPassword'

export interface FormData {
  email: string
  nickname: string
  password: string
  confirmPassword: string
}

export interface FormErrorMessages {
  email?: string
  nickname?: string
  password?: string
  confirmPassword?: string
}

export interface SignUpApiRequest {
  email: string
  nickname: string
  password: string
}
