import { useState } from 'react'
import type { FormData, FormErrors, FormField } from '@/types/auth.types'
import { validationRules } from '@/constants/validationRules'

export const useFormState = (initialState: FormData) => {
  const [formData, setFormData] = useState<FormData>(initialState)
  const [errors, setErrors] = useState<FormErrors>({})

  const validateField = (
    name: FormField,
    value: string,
  ): string | undefined => {
    const { pattern, errorMessage } = validationRules[name]

    if (!pattern.test(value)) {
      return errorMessage
    }

    if (name === 'confirmPassword' && value !== formData.password) {
      return validationRules.confirmPassword.errorMessage
    }

    return undefined
  }

  const updateErrors = (name: FormField, value: string) => {
    const error = validateField(name, value)
    setErrors((prev) => ({ ...prev, [name]: error }))

    if (name === 'password') {
      const confirmPasswordError = validateField(
        'confirmPassword',
        formData.confirmPassword,
      )
      setErrors((prev) => ({ ...prev, confirmPasswordError }))
    }
  }

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const { name, value } = e.target as { name: FormField; value: string }
    setFormData((prev) => ({ ...prev, [name]: value }))
    updateErrors(name, value)
  }

  const isFormValid = () => {
    const isAllFieldsFilled = Object.values(formData).every(Boolean)
    const isNoErrors = Object.values(errors).every(
      (error) => error === undefined,
    )
    return isAllFieldsFilled && isNoErrors
  }

  const getApiRequestData = () => {
    const { confirmPassword, ...rest } = formData
    return rest
  }

  return {
    formData,
    errors,
    handleChange,
    isFormValid,
    getApiRequestData,
  }
}
