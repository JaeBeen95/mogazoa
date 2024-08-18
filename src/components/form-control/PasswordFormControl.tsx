import { useState } from 'react'
import FormControl from '@/components/form-control/FormControl'
import { Icon } from '@/components/icon'
import type { FormControlProps, FieldProps } from '@/types/form.types'
import styles from './FormControl.module.scss'

function ToggleEye({
  isPasswordVisible,
  setIsPasswordVisible,
}: {
  isPasswordVisible: boolean
  setIsPasswordVisible: React.Dispatch<React.SetStateAction<boolean>>
}) {
  const iconType = isPasswordVisible ? 'show' : 'hide'
  const iconLabel = `비밀번호 ${isPasswordVisible ? '표시' : '감춤'}`

  const handleToggle = () => {
    setIsPasswordVisible((isPasswordVisible) => !isPasswordVisible)
  }

  return (
    <button className={styles.button} type="button" onClick={handleToggle}>
      <Icon type={iconType} alt={iconLabel} title={iconLabel} />
    </button>
  )
}

function PasswordField({ autoComplete, ...props }: FieldProps) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)

  return (
    <FormControl.Field
      {...props}
      type={isPasswordVisible ? 'text' : 'password'}
      autoComplete={autoComplete}
    >
      <ToggleEye
        isPasswordVisible={isPasswordVisible}
        setIsPasswordVisible={setIsPasswordVisible}
      />
    </FormControl.Field>
  )
}

export default function PasswordFormControl({
  children,
  ...props
}: FormControlProps) {
  return <FormControl {...props}>{children}</FormControl>
}

PasswordFormControl.Label = FormControl.Label
PasswordFormControl.Field = PasswordField
PasswordFormControl.ErrorMessage = FormControl.ErrorMessage
