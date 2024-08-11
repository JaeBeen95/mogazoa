'use client'

import { Input, PasswordInput } from '@/components/input'
import { Button } from '@/components/button'
import { useSignUp } from '@/hooks/useSignUp'
import styles from '@/app/(auth)/Auth.module.scss'

export default function SignUpClient() {
  const {
    formData,
    errors,
    handleChange,
    handleSubmit,
    isFormValid,
    isLoading,
    apiError,
  } = useSignUp()

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
