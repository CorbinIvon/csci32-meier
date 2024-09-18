import React from 'react'
import PageLayout from '@/components/client/PageLayout'
import { Button } from '@repo/ui/src/button'
import { Size } from '@repo/ui/src/size'
import { Variant } from '@repo/ui/src/variant'
import GoogleSignInButton from '@sso/GoogleSignInButton'

const csci32_assignment_week_3 = () => {
  return (
    <PageLayout>
      <h2 className="text-2xl font-semibold">Week 3 - Turborepo, Custom Packages, and a Button</h2>
      <section>
        <p>
          This week I&apos;ve set up a monorepo using <a href="https://www.npmjs.com/package/turborepo">turborepo</a>.
          This allows me to manage multiple packages in the same repository. I&apos;ve also created a package for the UI
          components that I&apos;ll be using thought this project.
        </p>
        <p>I have created the following components in the packages thus far:</p>
      </section>
      <section>
        <br></br>
        <hr></hr>
        <br></br>
        <h3 className="text-xl font-semibold">Buttons</h3>
        <p>
          The button component is a simple component that takes two props to render a button. It can be used as a button
          element or an anchor element. The component is styled using Tailwind CSS classes.
        </p>
        <p>
          It takes two props, <code>size</code> and <code>variant</code>. The size prop can be <code>large</code>,{' '}
          <code>medium</code>, or <code>small</code>. The variant prop can be <code>primary</code>,{' '}
          <code>secondary</code>, or <code>tertiary</code>. Here are some examples of the buttons:
        </p>
        <br></br>
        <div>
          <Button size={Size.LARGE} variant={Variant.PRIMARY}>
            LARGE PRIMARY
          </Button>
          <Button size={Size.MEDIUM} variant={Variant.PRIMARY}>
            MEDIUM PRIMARY
          </Button>
          <Button size={Size.SMALL} variant={Variant.PRIMARY}>
            SMALL PRIMARY
          </Button>
        </div>
        <div>
          <Button size={Size.LARGE} variant={Variant.SECONDARY}>
            LARGE SECONDARY
          </Button>
          <Button size={Size.MEDIUM} variant={Variant.SECONDARY}>
            MEDIUM SECONDARY
          </Button>
          <Button size={Size.SMALL} variant={Variant.SECONDARY}>
            SMALL SECONDARY
          </Button>
        </div>
        <div>
          <Button size={Size.LARGE} variant={Variant.TERTIARY}>
            LARGE TERTIARY
          </Button>
          <Button size={Size.MEDIUM} variant={Variant.TERTIARY}>
            MEDIUM TERTIARY
          </Button>
          <Button size={Size.SMALL} variant={Variant.TERTIARY}>
            SMALL TERTIARY
          </Button>
        </div>
      </section>
      <section>
        <br />
        <hr />
        <br />
        <h3 className="text-xl font-semibold">Single Sign On (SSO)</h3>
        <p>
          The SSO component utilizes firebase to obtain authentication tokens. This allows me to call the{' '}
          <code>GoogleSignInButton</code> tag anywhere to create a Sign in with Google button. Give it a try!
        </p>
        <br />
        <GoogleSignInButton />
      </section>
    </PageLayout>
  )
}

export default csci32_assignment_week_3
