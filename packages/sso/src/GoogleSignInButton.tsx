'use client'

import React, { useState, useEffect } from 'react'
import { auth, provider, signInWithPopup, signOut } from './firebase'
import { User } from 'firebase/auth'
import Image from 'next/image'

const GoogleSignInButton: React.FC = () => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((firebaseUser) => {
      setUser(firebaseUser)
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider)
      setUser(result.user)
    } catch (error) {
      console.error('Error signing in with Google:', error)
    }
  }

  const handleSignOut = async () => {
    try {
      await signOut(auth)
      setUser(null)
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }

  if (loading) {
    return <p>Loading...</p>
  }

  return (
    <div>
      {user ? (
        <div>
          <Image
            src={user.photoURL ?? '/images/default-profile.png'}
            alt={user.displayName ?? 'User'}
            width={50}
            height={50}
            style={{ borderRadius: '50%' }}
          />
          <p>{user.displayName ?? 'User'}</p>
          <button onClick={handleSignOut}>Log out</button>
        </div>
      ) : (
        <button onClick={handleGoogleSignIn} className="border rounded-full p-2">
          <div className="flex flex-row">
            <img src="/images/google-logo.png" alt="Google Logo" width={20} height={20} />
            <p>&nbsp;Sign in with Google</p>
          </div>
        </button>
      )}
    </div>
  )
}

export default GoogleSignInButton
