// csci32-meier/src/app/page.tsx

import React from 'react'
import PageLayout from '@/components/client/PageLayout'

const HomePage = () => {
  return (
    <PageLayout>
      <h2 className="text-2xl font-semibold">Welcome to Corbin's Online Resource Center</h2>
      <section className="Introduction m-4">
        <h3 className="text-xl font-semibold">Introduction</h3>
        <p className="mb-4">
          For as long as I can remember, I've had a vision of creating a method to catalogue all of my thoughts and
          things. From personal files, notes, and ideas to external resources. It was apparent that there were plenty of
          tools available online, but nothing that fit my specific needs. It became clear that I needed a custom and
          simple solution to organize and access all of my digital resources. This page is that solution.
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
          located from the top-left tab. Click on the links to view the content. If you have any questions or feedback,
          please feel free to reach out to me through github. Enjoy!
        </p>
      </section>
    </PageLayout>
  )
}

export default HomePage
