'use client'

import { useState, ChangeEvent, FormEvent } from 'react'
import axios from 'axios'
import { Input, PasswordInput } from '@/components/input'
import Button from '@/components/button/Button'
import styles from '@/app/(auth)/Auth.module.scss'

type FormField = 'email' | 'nickname' | 'password' | 'confirmPassword'

interface FormData {
  email: string
  nickname: string
  password: string
  confirmPassword: string
}

interface FormErrors {
  email?: string
  nickname?: string
  password?: string
  confirmPassword?: string
}

interface ValidationRule {
  pattern: RegExp
  message: string
}

const validationRules = {
  email: {
    pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    message: '올바른 이메일 주소를 입력해주세요',
  },
  nickname: {
    pattern: /^[a-zA-Z0-9가-힣]{2,10}$/,
    message: '닉네임은 2-10자의 영문, 숫자, 한글만 사용 가능합니다',
  },
  password: {
    pattern: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,20}$/,
    message:
      '비밀번호는 8-20자의 영문자, 숫자, 특수문자를 모두 포함해야 합니다',
  },
  confirmPassword: {
    pattern: /.*/,
    message: '비밀번호가 일치하지 않습니다',
  },
} as const

function useFormState(initialState: FormData) {
  const [formData, setFormData] = useState<FormData>(initialState)
  const [errors, setErrors] = useState<FormErrors>({})

  const validateField = (
    name: FormField,
    value: string,
  ): string | undefined => {
    if (name === 'confirmPassword') {
      return value === formData.password
        ? undefined
        : validationRules[name].message
    }

    const { pattern, message } = validationRules[name]
    return pattern.test(value) ? undefined : message
  }

  const updateErrors = (name: FormField, value: string) => {
    const error = validateField(name, value)
    setErrors((prev) => ({ ...prev, [name]: error }))

    if (name === 'password') {
      const confirmPasswordError = validateField(
        'confirmPassword',
        formData.confirmPassword,
      )
      setErrors((prev) => ({ ...prev, confirmPassword: confirmPasswordError }))
    }
  }

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const { name, value } = e.target as { name: FormField; value: string }
    setFormData((prev) => ({ ...prev, [name]: value }))
    updateErrors(name, value)
  }

  const isFormValid = () => {
    const isAllFieldsFilled = Object.values(formData).every(Boolean)
    const isNoErrors = Object.values(errors).every(
      (error) => error === undefined,
    )
    return isAllFieldsFilled && isNoErrors
  }

  return {
    formData,
    errors,
    handleChange,
    isFormValid,
  } as const
}

function useSignUpLogic() {
  const { formData, errors, handleChange, isFormValid } = useFormState({
    email: '',
    nickname: '',
    password: '',
    confirmPassword: '',
  })
  const [isLoading, setIsLoading] = useState(false)
  const [apiError, setApiError] = useState<string | null>(null)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (isFormValid()) {
      setIsLoading(true)
      setApiError(null)
      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_KEY}/auth/signUp`,
          {
            email: formData.email,
            nickname: formData.nickname,
            password: formData.password,
            passwordConfirmation: formData.confirmPassword,
          },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          },
        )

        console.log('회원가입 성공:', response.data)
      } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
          setApiError(
            error.response.data.message || '회원가입 중 오류가 발생했습니다.',
          )
        } else {
          setApiError('알 수 없는 오류가 발생했습니다.')
        }
      } finally {
        setIsLoading(false)
      }
    }
  }

  return {
    formData,
    errors,
    handleChange,
    handleSubmit,
    isFormValid,
    isLoading,
    apiError,
  }
}

export default function SignUpClient() {
  const {
    formData,
    errors,
    handleChange,
    handleSubmit,
    isFormValid,
    isLoading,
    apiError,
  } = useSignUpLogic()

  return (
    <section className={styles.page}>
      <div className={styles.container}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <Input
            id="email"
            value={formData.email}
            onChange={handleChange}
            error={errors.email ? { message: errors.email } : undefined}
          >
            <Input.Label>이메일</Input.Label>
            <Input.InputField
              name="email"
              placeholder="이메일을 입력해 주세요"
            />
            <Input.ErrorMessage />
          </Input>

          <Input
            id="nickname"
            value={formData.nickname}
            onChange={handleChange}
            error={errors.nickname ? { message: errors.nickname } : undefined}
          >
            <Input.Label>닉네임</Input.Label>
            <Input.InputField
              name="nickname"
              placeholder="닉네임을 입력해 주세요"
            />
            <Input.ErrorMessage />
          </Input>

          <PasswordInput
            id="password"
            value={formData.password}
            onChange={handleChange}
            error={errors.password ? { message: errors.password } : undefined}
          >
            <PasswordInput.Label>비밀번호</PasswordInput.Label>
            <PasswordInput.InputField
              name="password"
              placeholder="비밀번호를 입력해 주세요"
            />
            <PasswordInput.ErrorMessage />
          </PasswordInput>

          <PasswordInput
            id="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            error={
              errors.confirmPassword
                ? { message: errors.confirmPassword }
                : undefined
            }
          >
            <PasswordInput.Label>비밀번호 확인</PasswordInput.Label>
            <PasswordInput.InputField
              name="confirmPassword"
              placeholder="비밀번호를 한번 더 입력해 주세요"
            />
            <PasswordInput.ErrorMessage />
          </PasswordInput>

          {apiError && <div className={styles.error}>{apiError}</div>}

          <Button
            variant="primary"
            width="100%"
            type="submit"
            disabled={!isFormValid() || isLoading}
          >
            {isLoading ? '처리 중...' : '가입하기'}
          </Button>
        </form>
      </div>
    </section>
  )
}
