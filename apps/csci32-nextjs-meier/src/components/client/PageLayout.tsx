'use client' // Mark this as a Client Component

import React, { useState, useEffect, useRef, ReactNode } from 'react'
import Avatar from '@/components/client/data_display/Avatar'
import BreadcrumbMenu from '@/components/client/navigation/BreadcrumbMenu' // Import the BreadcrumbMenu
// Import the JSON data
import resourceCatalogue from '@/app/data/resource-catalogue.json'

// Define the Item interface
interface Item {
  title: string
  url?: string
  items?: Item[]
}

interface PageLayoutProps {
  children: ReactNode
}

const PageLayout: React.FC<PageLayoutProps> = ({ children }) => {
  const [baseUrl, setBaseUrl] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState('') // Search term state
  const [breadcrumb, setBreadcrumb] = useState<Item[]>([]) // Keep track of breadcrumb in the parent
  const [inSearchMode, setInSearchMode] = useState(false) // Track if we're in search mode
  const searchInputRef = useRef<HTMLInputElement>(null) // Ref for the search input

  // Set base URL on client side
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setBaseUrl(window.location.origin)
    }
  }, [])

  // Add Ctrl + K keyboard shortcut to focus search bar
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === 'k') {
        e.preventDefault() // Prevent default browser search
        searchInputRef.current?.focus() // Focus on the search input
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  // Handle the search functionality
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value) // Persist the search term in the state
  }

  // Log or handle the breadcrumb navigation changes
  const handleNavigate = (breadcrumb: Item[], inSearchMode: boolean) => {
    setBreadcrumb(breadcrumb)
    setInSearchMode(inSearchMode)
    console.log('Breadcrumb:', breadcrumb, 'Search Mode:', inSearchMode) // Debugging purposes
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header Section */}
      <header className="p-5 bg-gray-100 border-b border-gray-300 flex justify-between items-center h-[70px]">
        {/* Left Section: Website Title and Navigation */}
        <div>
          <h1 className="text-xl font-bold">Online Resource Center - Corbin Meier</h1>
          <nav>
            <ul className="flex list-none gap-4 p-0">
              <li>
                <a href="/" className="text-blue-600 hover:underline">
                  Home
                </a>
              </li>
              <li>
                <a href="/updates" className="text-blue-600 hover:underline">
                  Updates
                </a>
              </li>
              <li>
                <a href="/about" className="text-blue-600 hover:underline">
                  About
                </a>
              </li>
              <li>
                <a href="/contact" className="text-blue-600 hover:underline">
                  Contact
                </a>
              </li>
            </ul>
          </nav>
        </div>

        {/* Right Section: Avatar */}
        <div className="hover:scale-110 transition-transform">
          <Avatar
            src="/images/corbin.jpg" // Replace with your actual avatar path
            alt="Corbin Meier"
            size={60} // Avatar size
            border={true} // Enable border
          />
        </div>
      </header>

      {/* Main Content Area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Search Bar Above the Aside */}
        <div className="w-64 p-4 border-r border-gray-300">
          <div className="mb-4">
            <div className="relative">
              <span
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                onClick={() => searchInputRef.current?.focus()}
              >
                Ctrl + K
              </span>
              <input
                type="text"
                placeholder="Search..."
                ref={searchInputRef} // Attach ref to the search input
                value={searchTerm} // Controlled input for search term
                onChange={handleSearch} // Handle search input change
                className="w-full p-2 pr-16 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Breadcrumb Menu */}
          <BreadcrumbMenu
            data={resourceCatalogue.catalogue}
            searchTerm={searchTerm} // Pass down the search term to filter items
            onNavigate={handleNavigate} // Update breadcrumb and search mode in parent
          />
        </div>

        {/* Main content on the right */}
        <main className="flex-1 p-6">{children}</main>
      </div>

      {/* Footer Section */}
      <footer className="p-5 bg-gray-100 border-t border-gray-300 text-center h-[60px]">
        <p>&copy; 2024 Online Resource Center - Corbin Meier. All Rights Reserved.</p>
      </footer>
    </div>
  )
}

export default PageLayout
