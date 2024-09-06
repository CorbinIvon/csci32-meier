// csci32-meier/src/app/components/client/actions/AnimatedImageButton.tsx
'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

interface AnimatedImageProps {
  defaultImage: string
  hoverImage: string
  clickedImage: string
  navigateTo: string
  audioSrc?: string
  alt?: string
  width?: number
  height?: number
  className?: string
}

export default function AnimatedImageButton({
  defaultImage,
  hoverImage,
  clickedImage,
  navigateTo,
  audioSrc,
  alt = 'Animated Image',
  width = 500,
  height = 500,
  className,
  ...rest
}: AnimatedImageProps) {
  const router = useRouter()
  const [imageSrc, setImageSrc] = useState(defaultImage)
  const [isClicked, setIsClicked] = useState(false)

  const handleClick = () => {
    if (audioSrc) {
      const audio = new Audio(audioSrc)
      audio.play()
    }
    setIsClicked(true)
    setImageSrc(clickedImage)

    setTimeout(() => {
      setIsClicked(false)
      setImageSrc(defaultImage)
      router.push(navigateTo)
    }, 700)
  }

  return (
    <div
      style={{ cursor: 'pointer' }}
      onMouseEnter={() => setImageSrc(hoverImage)}
      onMouseLeave={() => !isClicked && setImageSrc(defaultImage)}
      onClick={handleClick}
    >
      <Image
        src={imageSrc}
        alt={alt}
        width={width}
        height={height}
        className={`${className} ${isClicked ? 'clicked' : ''}`}
        {...rest}
      />
      <style jsx>{`
        .clicked {
          transform: scale(0.9);
          transition: transform 0.7s ease;
        }
      `}</style>
    </div>
  )
}
