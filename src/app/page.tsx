// csci32-meier/src/app/page.tsx
'use client' // Mark this as a Client Component

import React, { useState, useEffect } from 'react'
import CollapsibleMenu from './components/client/navigation/CollapsibleMenu'
import Avatar from './components/client/data_display/Avatar'
// Import the JSON data
import resourceCatalogue from './data/resource-catalogue.json'

export default function HomePage() {
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
            </div>{' '}
          </div>

          {/* Collapsible Menu in Aside */}
          <aside className="overflow-y-auto max-h-[calc(100vh-70px-60px)]">
            {baseUrl && <CollapsibleMenu data={navigationData} />}
          </aside>
        </div>

        {/* Main content on the right */}
        <main className="flex-1 p-6">
          <h2 className="text-2xl font-semibold">Welcome to Corbin's Online Resource Center</h2>
          <section className="Introduction m-4">
            <h3 className="text-xl font-semibold">Introduction</h3>
            <p className="mb-4">
              For as long as I can remember, I've had a vision of creating a method to catalogue all of my thoughts and
              things. From personal files, notes, and ideas to external resources. It was apparent that there were
              plenty of tools available online, but nothing that fit my specific needs. It became clear that I needed a
              custom and simple solution to organize and access all of my digital resources. This page is that solution.
            </p>
            <p>This project is open source and available to everyone. Installation instructions on Github.</p>
          </section>
          <section className="Features m-4">
            <h3 className="text-xl font-semibold">Features</h3>
            <ul className="list-disc pl-6">
              <li>Simple and easy-to-use interface</li>
              <li>Collapsible menu for easy navigation</li>
              <li>Infinite navigation nesting</li>
              <li>Searchable content</li>
              <li>Well structured database</li>
              <li>Responsive design for all device types</li>
            </ul>
          </section>
          <section className="HowToUse m-4">
            <h3 className="text-xl font-semibold">How To Use</h3>
            <p>
              Simply click through the navigation on the left of the screen. For mobile users, the navigation will be
              located from the top-left tab. Click on the links to view the content. If you have any questions or
              feedback, please feel free to reach out to me through github. Enjoy!
            </p>
          </section>
        </main>
      </div>

      {/* Footer Section */}
      <footer className="p-5 bg-gray-100 border-t border-gray-300 text-center h-[60px]">
        <p>&copy; 2024 Online Resource Center - Corbin Meier. All Rights Reserved.</p>
      </footer>
    </div>
  )
}
