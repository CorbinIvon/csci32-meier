// csci32-meier/src/app/components/client/data_display/Avatar.tsx
'use client' // Mark this as a Client Component

import React from 'react'

interface AvatarProps {
  src?: string
  alt?: string
  size?: number
  initials?: string
  border?: boolean
  nameClass?: string // New prop for custom Tailwind CSS for initials text
}

const Avatar: React.FC<AvatarProps> = ({
  src,
  alt = 'Avatar',
  size = 50,
  initials = 'N/A',
  border = false,
  nameClass = '',
}) => {
  const sizeClass = `w-${size} h-${size}`
  const borderClass = border ? 'border-2 border-gray-300' : ''

  return (
    <div
      className={`flex items-center justify-center bg-gray-300 text-gray-800 font-bold uppercase rounded-full ${borderClass}`}
      style={{ width: size, height: size }}
    >
      {src ? (
        <img src={src} alt={alt} className="w-full h-full object-cover rounded-full" />
      ) : (
        <span className={`text-lg ${nameClass}`}>{initials}</span> // Apply custom Tailwind classes
      )}
    </div>
  )
}

export default Avatar
