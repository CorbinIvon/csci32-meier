import { getInputSizeStyles, Size } from './size'
import { HTMLInputTypeAttribute, useState } from 'react'
import { getVariantBorderStyles, getVariantInputTextStyles, getVariantOutlineStyles, Variant } from './variant'
import { getCommonInputStyles } from './tokens'
import { noop } from 'lodash'

interface InputProps {
  variant?: Variant
  size?: Size
  placeholder?: string
  type?: HTMLInputTypeAttribute
  value?: any
  onChange?: (newValue: any) => void
  onEnter?: (newValue: any) => void
  defaultValue?: any
  name: string
  className?: string
  id: string
}
export function Input({
  variant = Variant.PRIMARY,
  size = Size.MEDIUM,
  value,
  name,
  id,
  defaultValue,
  className = '',
  onChange,
  onEnter = noop,
  type = 'text',
  placeholder,
}: InputProps) {
  const [internalValue, setInternalValue] = useState(value)
  const sizeCssClasses = getInputSizeStyles(size)
  const variantOutlineCssClasses = getVariantOutlineStyles(variant)
  const variantBorderCssClasses = getVariantBorderStyles(variant)
  const variantInputTextCssClasses = getVariantInputTextStyles(variant)
  const commonCssClasses = getCommonInputStyles()

  function handleKeyUp(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      onEnter(value ?? internalValue)
    }
  }

  return (
    <input
      className={`${sizeCssClasses} ${variantBorderCssClasses} ${variantInputTextCssClasses} ${variantOutlineCssClasses} ${commonCssClasses} ${className}`}
      name={name}
      id={id}
      defaultValue={defaultValue}
      placeholder={placeholder}
      type={type}
      value={value || internalValue}
      onKeyUp={handleKeyUp}
      onChange={
        onChange
          ? (newValue) => onChange(newValue.currentTarget.value)
          : (newValue) => setInternalValue(newValue.currentTarget.value)
      }
    />
  )
}
