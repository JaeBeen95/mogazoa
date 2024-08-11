import { useState } from 'react'
import { Input } from '@/components/input'
import { Icon } from '@/components/icon'
import type { InputProps, InputFieldProps } from '@/types/Input.types'
import styles from './Input.module.scss'

function ToggleEye({
  isPasswordVisible,
  setIsPasswordVisible,
}: {
  isPasswordVisible: boolean
  setIsPasswordVisible: React.Dispatch<React.SetStateAction<boolean>>
}) {
  const iconType = isPasswordVisible ? 'show' : 'hide'
  const iconLabel = `비밀번호 ${isPasswordVisible ? '표시' : '감춤'}`

  return (
    <button
      className={styles.button}
      type="button"
      onClick={() => setIsPasswordVisible(!isPasswordVisible)}
    >
      <Icon type={iconType} alt={iconLabel} title={iconLabel} />
    </button>
  )
}

function PasswordInputField(props: InputFieldProps) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)

  return (
    <Input.InputField {...props} type={isPasswordVisible ? 'text' : 'password'}>
      <ToggleEye
        isPasswordVisible={isPasswordVisible}
        setIsPasswordVisible={setIsPasswordVisible}
      />
    </Input.InputField>
  )
}

export default function PasswordInput({ children, ...props }: InputProps) {
  return <Input {...props}>{children}</Input>
}

PasswordInput.Label = Input.Label
PasswordInput.InputField = PasswordInputField
PasswordInput.ErrorMessage = Input.ErrorMessage
