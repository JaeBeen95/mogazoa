import { useState } from 'react'
import classNames from 'classnames'
import {
  FormControlContext,
  useFormControlContext,
} from '@/context/FormControlContext'
import { Icon } from '@/components/icon'
import type {
  FormControlProps,
  LabelProps,
  FieldProps,
} from '@/types/form.types'
import styles from './FormControl.module.scss'

// 기본 form-control field

function Label({ children, visible = true }: LabelProps) {
  const { id } = useFormControlContext()
  return (
    <label
      className={classNames(styles.label, !visible && styles.labelHidden)}
      htmlFor={id}
    >
      {children}
    </label>
  )
}

function Field({
  type = 'text',
  name = '',
  placeholder = '',
  readOnly,
  disabled,
  children,
  autoComplete,
}: FieldProps & { children?: React.ReactNode }) {
  const { id, value, onChange, error } = useFormControlContext()

  return (
    <div
      className={classNames(
        styles.fieldWrapper,
        value !== '' && error && styles.fieldWrapperError,
      )}
    >
      <input
        className={styles.field}
        type={type}
        id={id}
        name={name}
        value={value}
        placeholder={placeholder}
        readOnly={readOnly}
        disabled={disabled}
        onChange={onChange}
        autoComplete={autoComplete}
      />
      {children}
    </div>
  )
}

function ErrorMessage() {
  const { error } = useFormControlContext()
  if (!error) return null
  return (
    <span className={styles.error} role="alert">
      {error.message}
    </span>
  )
}

function FormControl({ children, ...contextValue }: FormControlProps) {
  return (
    <FormControlContext.Provider value={contextValue}>
      <div className={styles.container}>{children}</div>
    </FormControlContext.Provider>
  )
}

FormControl.Label = Label
FormControl.Field = Field
FormControl.ErrorMessage = ErrorMessage

// password form-control field

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
    setIsPasswordVisible((prevState) => !prevState)
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

function PasswordFormControl({ children, ...props }: FormControlProps) {
  return <FormControl {...props}>{children}</FormControl>
}

PasswordFormControl.Label = FormControl.Label
PasswordFormControl.Field = PasswordField
PasswordFormControl.ErrorMessage = FormControl.ErrorMessage

export { FormControl, PasswordFormControl }
