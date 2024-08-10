'use client'
import Link from 'next/link'
import { useState, ChangeEvent } from 'react'

import { Input, PasswordInput } from '@/components/input'
import Button from '@/components/button/Button'
import styles from '@/app/(auth)/Auth.module.scss'

export default function SignUpClient() {
  const [email, setEmail] = useState('')
  const [nickname, setNickname] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const handleChange =
    (setter: React.Dispatch<React.SetStateAction<string>>) =>
    (e: ChangeEvent<HTMLInputElement>) => {
      setter(e.target.value)
    }

  return (
    <section className={styles.page}>
      <div className={styles.container}>
        <form className={styles.form}>
          <Input id="email" value={email} onChange={handleChange(setEmail)}>
            <Input.Label>이메일</Input.Label>
            <Input.InputField
              name="email"
              placeholder="이메일을 입력해 주세요"
            />
            <Input.ErrorMessage />
          </Input>

          <Input
            id="nickname"
            value={nickname}
            onChange={handleChange(setNickname)}
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
            value={password}
            onChange={handleChange(setPassword)}
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
            value={confirmPassword}
            onChange={handleChange(setConfirmPassword)}
          >
            <PasswordInput.Label>비밀번호 확인</PasswordInput.Label>
            <PasswordInput.InputField
              name="confirmPassword"
              placeholder="비밀번호를 한번 더 입력해 주세요"
            />
            <PasswordInput.ErrorMessage />
          </PasswordInput>

          <Button variant="primary" width="100%">
            가입하기
          </Button>
        </form>
      </div>
    </section>
  )
}
