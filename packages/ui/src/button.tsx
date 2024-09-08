'use client'

import { ReactNode } from 'react'

interface ButtonProps {
  children: ReactNode
  className?: string
  alertString?: string
}

export const Button = ({ children, className, alertString }: ButtonProps) => {
  return (
    <button
      className={className}
      onClick={() => {
        if (alertString !== undefined) alert(alertString)
      }}
    >
      {children}
    </button>
  )
}
