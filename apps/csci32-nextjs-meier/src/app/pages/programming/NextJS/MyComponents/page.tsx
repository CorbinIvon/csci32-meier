import React from 'react'
import PageLayout from '@/components/client/PageLayout'
import AnimatedImageButton from '@/components/client/actions/AnimatedImageButton'
import GoogleSignInButton from '@sso/GoogleSignInButton'

const Programming_NextJS_My_Components = () => {
  return (
    <PageLayout>
      <h2 className="text-2xl font-semibold">My Components</h2>
      <section className="Introduction m-4">
        <h3 className="text-xl font-semibold">Introduction</h3>
        <p className="mb-4">
          Below is a list of components that I&apos;ve created for NextJS. These will have a use at some point in my
          lifetime. I hope you enjoy them!
        </p>
        <hr />
      </section>
      <section className="Components m-4">
        <h3 className="text-xl font-semibold">Components</h3>
        <div className="inline-flex flex-col border">
          <p className="text-center font-extrabold">Animated Image Button With Audio</p>
          <AnimatedImageButton
            defaultImage="/images/bongo.default.png"
            hoverImage="/images/bongo.onHover.png"
            clickedImage="/images/bongo.onClick.png"
            navigateTo=""
            audioSrc="/audio/bongo.wav"
            className="shadow-md rounded-3xl"
            alt="Interactive Image"
            width={400}
            height={400}
          />
        </div>
        <div className="inline-flex flex-col border">
          <p>An easy to implement google sign in button</p>
          <GoogleSignInButton />
        </div>
      </section>
    </PageLayout>
  )
}

export default Programming_NextJS_My_Components
