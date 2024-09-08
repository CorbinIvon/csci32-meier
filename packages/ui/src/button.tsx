'use client'

import { ReactNode } from 'react'
import { Size } from './size'
import { Variant } from './variant'

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
  let sizeClasses = ''
  switch (size) {
    case Size.SMALL:
      sizeClasses = 'px-2 py-1'
      break
    case Size.MEDIUM:
      sizeClasses = 'px-4 py-2'
      break
    case Size.LARGE:
      sizeClasses = 'px-6 py-3'
      break
  }

  let variantClasses = ''
  switch (variant) {
    case Variant.PRIMARY:
      variantClasses = 'bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800'
      break
    case Variant.SECONDARY:
      variantClasses = 'bg-gray-600 text-white hover:bg-gray-700 active:bg-gray-800'
      break
    case Variant.TERTIARY:
      variantClasses = 'bg-gray-300 text-gray-800 hover:bg-gray-400 active:bg-gray-500'
      break
  }

  const customClassName = `${sizeClasses} ${variantClasses} focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-lg shadow-md transition ease-in-out duration-150 ${className}`

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
