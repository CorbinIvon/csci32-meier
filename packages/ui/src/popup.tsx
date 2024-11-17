import React, { useEffect, useState } from 'react'
import { Flex } from './flex'

export enum PopupType {
  ERROR = 'error',
  SUCCESS = 'success',
  WARNING = 'warning',
  INFO = 'info',
}

export type PopupProps = {
  message: string
  type?: PopupType
  duration?: number
  onClose?: () => void
}

export const Popup: React.FC<PopupProps> = ({ message, type = PopupType.INFO, duration = 3000, onClose }) => {
  const [isVisible, setIsVisible] = useState(true)
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    // Don't auto-close if it's an error or if being hovered
    if (isHovered) return

    const timer =
      duration != null
        ? setTimeout(() => {
            setIsVisible(false)
            onClose?.()
          }, duration)
        : undefined

    return () => clearTimeout(timer)
  }, [duration, onClose, type, isHovered])

  if (!isVisible) return null

  const colors = {
    error: 'bg-red-100 border-red-400 text-red-700',
    success: 'bg-green-100 border-green-400 text-green-700',
    warning: 'bg-yellow-100 border-yellow-400 text-yellow-700',
    info: 'bg-blue-100 border-blue-400 text-blue-700',
  }

  return (
    <div
      className="fixed top-4 right-4 z-50 min-w-[200px] max-w-[400px]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`${colors[type]} p-4 rounded shadow-lg border transition-opacity duration-200`}>
        <Flex className="items-center justify-between gap-4">
          <p className="flex-1">{message}</p>
          <button
            onClick={() => {
              setIsVisible(false)
              onClose?.()
            }}
            className="shrink-0 w-5 h-5 flex items-center justify-center rounded-full hover:bg-black/10"
            aria-label="Close notification"
          >
            ✕
          </button>
        </Flex>
      </div>
    </div>
  )
}

export function usePopup() {
  const [popup, setPopup] = useState<Omit<PopupProps, 'onClose'> | null>(null)

  const showPopup = (props: Omit<PopupProps, 'onClose'>) => {
    setPopup(props)
  }

  const hidePopup = () => {
    setPopup(null)
  }

  const PopupComponent = popup ? <Popup {...popup} onClose={hidePopup} /> : null

  return {
    showPopup,
    hidePopup,
    PopupComponent,
  }
}
