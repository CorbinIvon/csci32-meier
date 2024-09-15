'use client'

import { ReactNode } from 'react'
import getSizeStyles, { Size } from './size'
import getVariantStyles, { Variant } from './variant'
import { getCommonStyles } from './tokens'

interface ButtonProps {
  children: ReactNode
  className?: string
  href?: string
  onClick?: () => void
  size?: Size
  variant?: Variant
}

export const Button = ({
  children,
  className = '',
  href,
  onClick,
  size = Size.MEDIUM,
  variant = Variant.PRIMARY,
}: ButtonProps) => {
  const sizeClasses = getSizeStyles(size)
  const variantClasses = getVariantStyles(variant)
  const customClassName = `${sizeClasses} ${variantClasses} ${getCommonStyles} ${className}`

  return href ? (
    <a href={href} onClick={onClick} className={customClassName}>
      {children}
    </a>
  ) : (
    <button className={customClassName} onClick={onClick}>
      {children}
    </button>
  )
}
