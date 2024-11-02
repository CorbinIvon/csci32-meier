'use client'

import { ReactNode } from 'react'
import { getSizeStyles, Size } from './size'
import { getVariantBackgroundStyles, getVariantButtonTextStyles, getVariantOutlineStyles, Variant } from './variant'
import { getCommonButtonStyles } from './tokens'

interface ButtonProps {
  children: ReactNode
  className?: string
  href?: string
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset'
  size?: Size
  variant?: Variant
}

export const Button = ({
  children,
  className,
  href,
  type = 'button',
  onClick,
  size = Size.MEDIUM,
  variant = Variant.PRIMARY,
}: ButtonProps) => {
  const sizeCssClasses = getSizeStyles(size)
  const variantButtonTextCssClasses = getVariantButtonTextStyles(variant)
  const variantBackgroundCssClasses = getVariantBackgroundStyles(variant)
  const variantOutlineCssClasses = getVariantOutlineStyles(variant)
  const commonCssClasses = getCommonButtonStyles()

  const completedCssClasses = `${sizeCssClasses} ${variantBackgroundCssClasses}  ${variantOutlineCssClasses} ${commonCssClasses} ${variantButtonTextCssClasses} ${className}`
  return href ? (
    <a href={href} className={completedCssClasses}>
      {children}
    </a>
  ) : (
    <button type={type} className={completedCssClasses} onClick={onClick}>
      {children}
    </button>
  )
}
