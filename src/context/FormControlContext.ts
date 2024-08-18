import { createContext, useContext } from 'react'
import type {
  FieldContextType,
  PasswordInputContextType,
} from '@/types/form.types'

export const FormControlContext = createContext<FieldContextType | undefined>(
  undefined,
)
export const PasswordInputContext = createContext<
  PasswordInputContextType | undefined
>(undefined)

export function useFormControlContext() {
  const context = useContext(FormControlContext)
  if (!context) {
    throw new Error('useInputContext는 Input 내부에서만 사용 가능합니다.')
  }
  return context
}

export function usePasswordInputContext() {
  const context = useContext(PasswordInputContext)
  if (!context) {
    throw new Error(
      'usePasswordInputContext는 PasswordInput 내부에서만 사용 가능합니다.',
    )
  }
  return context
}
