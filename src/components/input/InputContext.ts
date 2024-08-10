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
    throw new Error(
      'Input 컴포넌트 내에서만 useInputContext를 사용할 수 있습니다.',
    )
  }
  return context
}

export function usePasswordInputContext() {
  const context = useContext(PasswordInputContext)
  if (!context) {
    throw new Error(
      'PasswordInput 컴포넌트 내에서만 usePasswordInputContext를 사용할 수 있습니다.',
    )
  }
  return context
}
