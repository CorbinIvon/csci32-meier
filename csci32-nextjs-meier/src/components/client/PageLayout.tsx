// csci32-meier/src/components/client/PageLayout.tsx
'use client' // Mark this as a Client Component

import React, { useState, useEffect, ReactNode } from 'react'
import CollapsibleMenu from '@/components/client/navigation/CollapsibleMenu'
import Avatar from '@/components/client/data_display/Avatar'
// Import the JSON data
import resourceCatalogue from '@/app/data/resource-catalogue.json'

interface PageLayoutProps {
  children: ReactNode
}

const PageLayout: React.FC<PageLayoutProps> = ({ children }) => {
  const [baseUrl, setBaseUrl] = useState<string | null>(null)

  // Set base URL on client side
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setBaseUrl(window.location.origin)
    }
  }, [])

  // Update internal links with the correct base URL (if necessary)
  const navigationData = resourceCatalogue.catalogue.map((item) => {
    if (item.title === 'Internal Links' && baseUrl) {
      return {
        ...item,
        items: item.items.map((link) => ({
          ...link,
          url: baseUrl + link.url,
        })),
      }
    }
    return item
  })

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
              <input
                type="text"
                placeholder="Search..."
                className="w-full p-2 pr-16 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">Ctrl + K</span>
            </div>
          </div>

          {/* Collapsible Menu in Aside */}
          <aside className="overflow-y-auto max-h-[calc(100vh-70px-60px)]">
            {baseUrl && <CollapsibleMenu data={navigationData} />}
          </aside>
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
