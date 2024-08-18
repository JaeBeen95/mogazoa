'use client'

import { FormControl, PasswordFormControl } from '@/components/form-control'
import { Button } from '@/components/button'
import { useSignUp } from '@/hooks/useSignUp'
import styles from '@/app/(auth)/Auth.module.scss'

export default function SignUpClient() {
  const {
    formData,
    errorMessages,
    handleChange,
    handleSubmit,
    isFormValid,
    isLoading,
  } = useSignUp()

  return (
    <section className={styles.page}>
      <div className={styles.container}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <FormControl
            id="email"
            value={formData.email}
            onChange={handleChange}
            error={
              errorMessages.email ? { message: errorMessages.email } : undefined
            }
          >
            <FormControl.Label>이메일</FormControl.Label>
            <FormControl.Field
              name="email"
              placeholder="이메일을 입력해 주세요"
            />
            <FormControl.ErrorMessage />
          </FormControl>

          <FormControl
            id="nickname"
            value={formData.nickname || ''}
            onChange={handleChange}
            error={
              errorMessages.nickname
                ? { message: errorMessages.nickname }
                : undefined
            }
          >
            <FormControl.Label>닉네임</FormControl.Label>
            <FormControl.Field
              name="nickname"
              placeholder="닉네임을 입력해 주세요"
              autoComplete="nick-name"
            />
            <FormControl.ErrorMessage />
          </FormControl>

          <PasswordFormControl
            id="password"
            value={formData.password}
            onChange={handleChange}
            error={
              errorMessages.password
                ? { message: errorMessages.password }
                : undefined
            }
          >
            <PasswordFormControl.Label>비밀번호</PasswordFormControl.Label>
            <PasswordFormControl.Field
              name="password"
              placeholder="비밀번호를 입력해 주세요"
              autoComplete="new-password"
            />
            <PasswordFormControl.ErrorMessage />
          </PasswordFormControl>

          <PasswordFormControl
            id="confirmPassword"
            value={formData.confirmPassword || ''}
            onChange={handleChange}
            error={
              errorMessages.confirmPassword
                ? { message: errorMessages.confirmPassword }
                : undefined
            }
          >
            <PasswordFormControl.Label>비밀번호 확인</PasswordFormControl.Label>
            <PasswordFormControl.Field
              name="confirmPassword"
              placeholder="비밀번호를 한번 더 입력해 주세요"
              autoComplete="new-password"
            />
            <PasswordFormControl.ErrorMessage />
          </PasswordFormControl>

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
