import { InputContext, useInputContext } from '@/context/InputContext'
import type {
  InputProps,
  LabelProps,
  InputFieldProps,
} from '@/types/Input.types'
import classNames from 'classnames'
import styles from './Input.module.scss'

function Label({ children, visible = true }: LabelProps) {
  const { id } = useInputContext()
  return (
    <label
      className={classNames(styles.label, !visible && styles.labelHidden)}
      htmlFor={id}
    >
      {children}
    </label>
  )
}

function InputField({
  type = 'text',
  name = '',
  placeholder = '',
  readOnly,
  disabled,
  children,
}: InputFieldProps & { children?: React.ReactNode }) {
  const { id, value, onChange, error } = useInputContext()

  return (
    <div
      className={classNames(
        styles.inputWrapper,
        value !== '' && error && styles.inputWrapperError,
      )}
    >
      <input
        className={styles.input}
        type={type}
        id={id}
        name={name}
        value={value}
        placeholder={placeholder}
        readOnly={readOnly}
        disabled={disabled}
        onChange={onChange}
      />
      {children}
    </div>
  )
}

function ErrorMessage() {
  const { error } = useInputContext()
  if (!error) return null
  return (
    <span className={styles.error} role="alert">
      {error.message}
    </span>
  )
}

export default function Input({ children, ...contextValue }: InputProps) {
  return (
    <InputContext.Provider value={contextValue}>
      <div className={styles.container}>{children}</div>
    </InputContext.Provider>
  )
}

Input.Label = Label
Input.InputField = InputField
Input.ErrorMessage = ErrorMessage
