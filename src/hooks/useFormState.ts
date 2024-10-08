import { useState, useCallback } from 'react'
import type { FormData, FormErrorMessages, FormField } from '@/types/auth.types'
import { validationRules } from '@/constants/validationRules'

export const useFormState = (initialState: FormData) => {
  const [formData, setFormData] = useState<FormData>(initialState)
  const [errorMessages, setErrorMessages] = useState<FormErrorMessages>({})

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
    const errorMessage = validateField(name, value)
    setErrorMessages((prev) => ({ ...prev, [name]: errorMessage }))

    if (name === 'password') {
      const confirmPasswordError = validateField(
        'confirmPassword',
        formData.confirmPassword || '',
      )
      setErrorMessages((prev) => ({ ...prev, confirmPasswordError }))
    }
  }

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const { name, value } = e.target as { name: FormField; value: string }
    setFormData((prev) => ({ ...prev, [name]: value }))
    updateErrors(name, value)
  }

  const isFormValid = useCallback(() => {
    const requiredFields = Object.keys(formData) as FormField[]
    const isAllFieldsFilled = requiredFields.every(
      (field) => formData[field] !== '',
    )
    const isNoErrors = requiredFields.every((field) => !errorMessages[field])
    return isAllFieldsFilled && isNoErrors
  }, [formData, errorMessages])

  const getApiRequestData = () => {
    const { confirmPassword, ...rest } = formData
    return rest
  }

  return {
    formData,
    errorMessages,
    handleChange,
    isFormValid,
    getApiRequestData,
  }
}
