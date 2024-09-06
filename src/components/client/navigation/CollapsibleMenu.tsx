// csci32-meier/src/components/client/navigation/CollapsibleMenu.tsx

'use client'

import React, { useState } from 'react'

interface CollapsibleProps {
  title: string
  items: any[]
}

const Collapsible: React.FC<CollapsibleProps> = ({ title, items }) => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleOpen = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className="mb-4">
      <div onClick={toggleOpen} className="cursor-pointer font-bold px-2 py-1 bg-gray-200 rounded-md">
        {title} {isOpen ? '-' : '+'}
      </div>
      {isOpen && (
        <div className="pl-4 mt-2">
          {items.map((item: any, index: number) =>
            item.url ? (
              <a
                key={index}
                href={item.url === '/' ? undefined : item.url} // If url is '/', set href to undefined
                className={`block hover:underline mb-1 ${
                  item.url === '/'
                    ? 'text-red-500 cursor-not-allowed' // Broken / Undefined Links
                    : item.url.startsWith('http')
                      ? 'text-orange-300' // External Links
                      : 'text-blue-500' // Internal Links
                }`}
                target={item.url.startsWith('http') ? '_blank' : '_self'}
                rel={item.url.startsWith('http') ? 'noopener noreferrer' : undefined}
                onClick={item.url === '/' ? (e) => e.preventDefault() : undefined} // Prevent click for '/'
              >
                {item.label}
              </a>
            ) : (
              <Collapsible key={index} title={item.title} items={item.items} />
            ),
          )}
        </div>
      )}
    </div>
  )
}

interface CollapsibleMenuProps {
  data: any[]
}

const CollapsibleMenu: React.FC<CollapsibleMenuProps> = ({ data }) => {
  return (
    <aside className="w-64 border-gray-300">
      {data.map((item, index) => (
        <Collapsible key={index} title={item.title} items={item.items} />
      ))}
    </aside>
  )
}

export default CollapsibleMenu
