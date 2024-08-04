'use client'
import Link from 'next/link'
import { useState } from 'react'

import Input from '@/components/input/Input'
import Button from '@/components/button/Button'
import styles from '@/app/(auth)/Auth.module.scss'

export default function SignUpClient() {
  const [email, setEmail] = useState('')
  const [nickname, setNickname] = useState('')
  const [password, setPassword] = useState('')

  return (
    <section className={styles.page}>
      <div className={styles.container}>
        <form className={styles.form}>
          <Input
            email
            id="email"
            name="email"
            value={email}
            label="이메일"
            labelVisible
            placeholder="이메일을 입력해 주세요"
            onChange={(e) => setEmail(e.target.value)}
          />

          <Input
            id="nickname"
            name="nickname"
            value={nickname}
            label="닉네임"
            labelVisible
            placeholder="닉네임을 입력해 주세요"
            onChange={(e) => setNickname(e.target.value)}
          />

          <Input
            password
            id="password"
            name="password"
            value={password}
            label="비밀번호"
            labelVisible
            placeholder="비밀번호를 입력해 주세요"
            onChange={(e) => setPassword(e.target.value)}
          />

          <Input
            password
            id="password"
            name="password"
            value={password}
            label="비밀번호 확인"
            labelVisible
            placeholder="비밀번호를 한번 더 입력해 주세요"
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button variant="primary" width="100%">
            가입하기
          </Button>
        </form>
      </div>
    </section>
  )
}
