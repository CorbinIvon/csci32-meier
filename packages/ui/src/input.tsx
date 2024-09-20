'use client'

import { HTMLInputTypeAttribute } from 'react'
import { Size, getInputSizeStyles } from './size'
import {
  Variant,
  getVariantBackgroundStyles,
  getVariantBorderStyles,
  getVariantInputTextStyles,
  getVariantOutlineStyles,
} from './variant'
import { getCommonStyles } from './tokens'

interface InputProps {
  placeholder?: string
  className?: string
  size?: Size
  variant?: Variant
  type?: HTMLInputTypeAttribute
  defaultValue?: any
  value?: any
  setValue?: (newValue: string | boolean) => void
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  name?: string
  id?: string
  disabled?: boolean
}

export const Input = ({
  placeholder,
  className = '',
  size = Size.MEDIUM,
  variant = Variant.PRIMARY,
  type = 'text',
  defaultValue,
  value,
  setValue,
  onChange,
  name,
  id,
  disabled = false,
}: InputProps) => {
  const checkboxStyles =
    type === 'checkbox' ? ' w-4 h-4 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 align-middle' : ''
  const customClassName = `${getCommonStyles} ${getInputSizeStyles(size)} ${getVariantBackgroundStyles(variant)} ${getVariantOutlineStyles(variant)} ${getVariantBorderStyles(variant)} ${getVariantInputTextStyles(variant)}${checkboxStyles} ${className}`

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (type === 'checkbox') {
      if (setValue) {
        setValue(e.target.checked)
      }
    } else {
      if (setValue) {
        setValue(e.target.value)
      }
    }

    if (onChange) {
      onChange(e)
    }
  }

  return (
    <input
      type={type}
      placeholder={placeholder}
      className={customClassName}
      defaultValue={defaultValue}
      value={type === 'checkbox' ? undefined : value}
      checked={type === 'checkbox' ? !!value : undefined}
      onChange={handleChange}
      name={name}
      id={id}
      disabled={disabled}
    />
  )
}
