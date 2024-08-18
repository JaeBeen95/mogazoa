import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useFormState } from './useFormState'
import { postSignIn } from '@/api/authApi'
import type { SignInApiRequest } from '@/types/auth.types'

export const useSignIn = () => {
  const {
    formData,
    errorMessages,
    handleChange,
    isFormValid,
    getApiRequestData,
  } = useFormState({
    email: '',
    password: '',
  })
  const [isLoading, setIsLoading] = useState(false)
  const [signInError, setSignInError] = useState<string | null>(null)
  const router = useRouter()

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault()
    if (isFormValid()) {
      setIsLoading(true)
      setSignInError(null)
      try {
        const signInData = getApiRequestData() as SignInApiRequest
        const response = await postSignIn(signInData)
        // TODO: 로그인 성공 처리(토큰 등)
        console.log(response)
        router.push('/')
      } catch (error) {
        console.error(error)
        setSignInError('이메일 또는 비밀번호가 올바르지 않습니다.')
      } finally {
        setIsLoading(false)
      }
    }
  }

  return {
    formData,
    errorMessages,
    handleChange,
    handleSubmit,
    isFormValid,
    isLoading,
    signInError,
  }
}
