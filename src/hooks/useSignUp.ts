import { useState } from 'react'
import { useFormState } from './useFormState'
import { postSignUp } from '@/api/authApi'

export const useSignUp = () => {
  const {
    formData,
    errorMessages,
    handleChange,
    isFormValid,
    getApiRequestData,
  } = useFormState({
    email: '',
    nickname: '',
    password: '',
    confirmPassword: '',
  })
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault()
    if (isFormValid()) {
      setIsLoading(true)
      try {
        const response = await postSignUp(getApiRequestData())
        // TODO: 로그인 리다이렉트 처리, 회원가입 실패 에러메시지 처리(닉네임중복, 이메일중복)
        console.log('')
      } catch (error) {
        console.error(error)
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
  }
}
