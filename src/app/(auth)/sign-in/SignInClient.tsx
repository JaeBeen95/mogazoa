'use client'

import { FormControl, PasswordFormControl } from '@/components/form-control'
import { Button } from '@/components/button'
import { useSignIn } from '@/hooks/useSignIn'
import styles from '@/app/(auth)/Auth.module.scss'

export default function SignInClient() {
  const {
    formData,
    errorMessages,
    handleChange,
    handleSubmit,
    isFormValid,
    isLoading,
  } = useSignIn()

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

          <Button
            variant="primary"
            width="100%"
            type="submit"
            disabled={!isFormValid() || isLoading}
          >
            {isLoading ? '처리 중...' : '로그인'}
          </Button>
        </form>
      </div>
    </section>
  )
}
