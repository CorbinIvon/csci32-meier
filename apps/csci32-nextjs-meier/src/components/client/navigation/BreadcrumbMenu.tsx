'use client'

import React, { useState, useEffect, useCallback } from 'react'

interface Item {
  title: string
  url?: string
  items?: Item[]
}

interface BreadcrumbMenuProps {
  data: Item[]
  searchTerm: string
  onNavigate: (breadcrumb: Item[], inSearchMode: boolean) => void
}

const BreadcrumbMenu: React.FC<BreadcrumbMenuProps> = ({ data, searchTerm, onNavigate }) => {
  const [breadcrumb, setBreadcrumb] = useState<Item[]>([])
  const [currentItems, setCurrentItems] = useState<Item[]>(data)

  const filterItems = useCallback(
    (items: Item[], path: Item[] = []): Item[] => {
      return items
        .map((item) => {
          const filteredSubItems = item.items ? filterItems(item.items, [...path, item]) : []
          const matchesTitle = item.title.toLowerCase().includes(searchTerm.toLowerCase())

          if (matchesTitle || filteredSubItems.length > 0) {
            return {
              ...item,
              items: filteredSubItems.length > 0 ? filteredSubItems : item.items,
              path: [...path, item], // Track the path to the result
            }
          }
          return null
        })
        .filter(Boolean) as Item[]
    },
    [searchTerm],
  )

  // Effect to handle search and navigation
  useEffect(() => {
    if (searchTerm) {
      // Perform the search globally from the root node
      const filteredResults = filterItems(data)

      // After filtering, move the user to their current navigation location
      const scopedItems = getItemsFromBreadcrumb(filteredResults, breadcrumb)
      setCurrentItems(scopedItems)
    } else {
      // If search is cleared, revert to the normal view
      const scopedItems = getItemsFromBreadcrumb(data, breadcrumb)
      setCurrentItems(scopedItems)
    }
  }, [searchTerm, breadcrumb, data, filterItems])

  // Filter items based on the search term globally

  // Get items based on the breadcrumb in the filtered data or root data
  const getItemsFromBreadcrumb = (items: Item[], breadcrumb: Item[]): Item[] => {
    let scopedItems = items
    breadcrumb.forEach((crumb) => {
      const match = scopedItems.find((item) => item.title === crumb.title)
      scopedItems = match?.items || []
    })
    return scopedItems
  }

  // Handle folder click
  const handleFolderClick = (folder: Item) => {
    const newBreadcrumb = [...breadcrumb, folder]
    setBreadcrumb(newBreadcrumb)
    setCurrentItems(folder.items || [])
    onNavigate(newBreadcrumb, false)
  }

  // Handle breadcrumb click
  const handleBreadcrumbClick = (index: number) => {
    const newBreadcrumb = breadcrumb.slice(0, index + 1)
    setBreadcrumb(newBreadcrumb)
    setCurrentItems(newBreadcrumb[newBreadcrumb.length - 1]?.items || data)
    onNavigate(newBreadcrumb, false)
  }

  const renderBreadcrumbList = () => (
    <ul className="list-disc ml-5 mb-4">
      <li key="home">
        <a
          href="#"
          onClick={() => {
            setBreadcrumb([])
            setCurrentItems(data)
            onNavigate([], false)
          }}
          className="cursor-pointer hover:underline text-blue-500"
        >
          Home
        </a>
      </li>
      {breadcrumb.map((crumb, index) => (
        <li key={index}>
          <a
            href="#"
            className="cursor-pointer hover:underline text-blue-500"
            onClick={() => handleBreadcrumbClick(index)}
          >
            {crumb.title}
          </a>
        </li>
      ))}
    </ul>
  )

  return (
    <div className="w-full">
      {renderBreadcrumbList()}
      <div className="pl-4 mt-2">
        {currentItems.map((item, index) =>
          item.items ? (
            <div
              key={index}
              className="cursor-pointer flex items-center bg-yellow-200 p-2 rounded mb-2"
              onClick={() => handleFolderClick(item)}
            >
              📁 <span className="ml-2">{item.title}</span>
            </div>
          ) : (
            <a
              key={index}
              href={item.url === '/' ? undefined : item.url}
              className={`block mb-1 p-2 rounded ${
                item.url === '/'
                  ? 'bg-red-100 text-red-500 cursor-not-allowed'
                  : item.url?.startsWith('http')
                    ? 'bg-orange-200 text-orange-700'
                    : 'bg-gray-100 text-black'
              }`}
              target={item.url?.startsWith('http') ? '_blank' : '_self'}
              rel={item.url?.startsWith('http') ? 'noopener noreferrer' : undefined}
            >
              {item.title}
            </a>
          ),
        )}
      </div>
    </div>
  )
}

export default BreadcrumbMenu
