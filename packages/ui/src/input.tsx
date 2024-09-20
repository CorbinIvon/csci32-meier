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
  setValue?: (newValue: string) => void
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  name?: string
  id?: string
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
}: InputProps) => {
  const customClassName = `${getCommonStyles} ${getInputSizeStyles(size)} ${getVariantBackgroundStyles(variant)} ${getVariantOutlineStyles(variant)} ${getVariantBorderStyles(variant)} ${getVariantInputTextStyles(variant)} ${className}`

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (setValue) {
      setValue(e.target.value)
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
      value={value}
      onChange={handleChange}
      name={name}
      id={id}
    />
  )
}
