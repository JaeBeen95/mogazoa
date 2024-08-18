import { ChangeEvent, ReactNode } from 'react'

export type FormChangeHandler = (e: ChangeEvent<HTMLInputElement>) => void

export interface ErrorType {
  message: string
}

export interface FieldContextType {
  id: string
  value: string
  onChange: FormChangeHandler
  error?: ErrorType
  disabled?: boolean
  children?: ReactNode
}

export interface PasswordFieldContextType extends FieldContextType {
  isPasswordVisible: boolean
  setIsPasswordVisible: (isVisible: boolean) => void
}

export interface LabelProps {
  children: ReactNode
  visible?: boolean
}

export interface FieldProps {
  name?: string
  placeholder?: string
  readOnly?: boolean
  disabled?: boolean
  type?: string
  autoComplete?: string
}

export interface FormControlProps extends FieldContextType {
  children: ReactNode
}
