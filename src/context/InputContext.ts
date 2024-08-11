import { createContext, useContext } from 'react'
import type {
  InputContextType,
  PasswordInputContextType,
} from '@/types/Input.types'

export const InputContext = createContext<InputContextType | undefined>(
  undefined,
)
export const PasswordInputContext = createContext<
  PasswordInputContextType | undefined
>(undefined)

export function useInputContext() {
  const context = useContext(InputContext)
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
