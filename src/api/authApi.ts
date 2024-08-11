import axios from 'axios'
import type { SignUpApiRequest } from '@/types/auth.types'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_KEY

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
})

export const postSignUp = (data: SignUpApiRequest) => {
  return apiClient.post('/auth/signUp', data, {
    headers: {
      'Content-Type': 'application/json',
    },
  })
}
