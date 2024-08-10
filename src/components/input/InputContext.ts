import { createContext, useContext } from 'react'
import type {
  InputContextType,
  PasswordInputContextType,
} from './InputTypes.type'

export const InputContext = createContext<InputContextType | undefined>(
  undefined,
)
export const PasswordInputContext = createContext<
  PasswordInputContextType | undefined
>(undefined)

export function useInputContext() {
  const context = useContext(InputContext)
  if (!context) {
    throw new Error('useInputContext must be used within an Input component')
  }
  return context
}

export function usePasswordInputContext() {
  const context = useContext(PasswordInputContext)
  if (!context) {
    throw new Error(
      'usePasswordInputContext must be used within a PasswordInput component',
    )
  }
  return context
}
