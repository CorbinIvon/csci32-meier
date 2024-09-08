import { signIn, signOut, useSession } from 'next-auth/react'
import Image from 'next/image'
import React from 'react'

// Single Sign-On (SSO) Component using Google
const GoogleSignInButton: React.FC = () => {
  const { data: session, status } = useSession()

  if (status === 'loading') {
    return <p>Loading...</p>
  }

  return (
    <div>
      {session ? (
        <div>
          <Image
            src={session.user?.image || '/default-profile.png'}
            alt={session.user?.name || 'User'}
            width={50}
            height={50}
            style={{ borderRadius: '50%' }}
          />
          <p>{session.user?.name}</p>
          <button onClick={() => signOut()}>Log out</button>
        </div>
      ) : (
        // User is not logged in: Display "Sign in with Google" button
        <button onClick={() => signIn('google')}>
          <img src="/google-logo.png" alt="Google Logo" width={20} height={20} />
          Sign in
        </button>
      )}
    </div>
  )
}

export default GoogleSignInButton
