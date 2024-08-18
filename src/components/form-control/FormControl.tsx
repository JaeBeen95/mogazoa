import {
  FormControlContext,
  useFormControlContext,
} from '@/context/FormControlContext'
import type {
  FormControlProps,
  LabelProps,
  FieldProps,
} from '@/types/form.types'
import classNames from 'classnames'
import styles from './FormControl.module.scss'

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

export default function FormControl({
  children,
  ...contextValue
}: FormControlProps) {
  return (
    <FormControlContext.Provider value={contextValue}>
      <div className={styles.container}>{children}</div>
    </FormControlContext.Provider>
  )
}

FormControl.Label = Label
FormControl.Field = Field
FormControl.ErrorMessage = ErrorMessage
