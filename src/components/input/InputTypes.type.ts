import { ChangeEvent, ReactNode } from 'react'

export type InputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => void

export interface ErrorType {
  message: string
}

export interface InputContextType {
  id: string
  value: string
  onChange: InputChangeHandler
  error?: ErrorType
  disabled?: boolean
  children?: ReactNode
}

export interface PasswordInputContextType extends InputContextType {
  isPasswordVisible: boolean
  setIsPasswordVisible: (isVisible: boolean) => void
}

export interface LabelProps {
  children: ReactNode
  visible?: boolean
}

export interface InputFieldProps {
  name?: string
  placeholder?: string
  readOnly?: boolean
  disabled?: boolean
  type?: string
}

export interface InputProps extends InputContextType {
  children: ReactNode
}
