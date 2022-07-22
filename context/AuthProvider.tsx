import { signOut } from 'firebase/auth'
import { useRouter } from 'next/router'
import React, { createContext, FC, ReactNode, useEffect, useState } from 'react'
import { auth } from '../firebase/config'

type User = {
  name?: string
}

interface AuthContextType {
  user: User
}

const initAuthContextState: AuthContextType = {
  user: {},
}

const AuthContext = createContext(initAuthContextState)
interface AuthProviderProps {
  children: ReactNode
}

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState({})
  const router = useRouter()

  useEffect(() => {
    const unsubscibed = auth.onAuthStateChanged((user) => {
      if (user) {
        const { displayName, email, uid, photoURL } = user
        signOut(auth)
        setUser({
          displayName,
          email,
          uid,
          photoURL,
        })
        router.push('/')
        return
      }

      setUser({})
      router.push(
        window.location.pathname === '/register' ? '/register' : '/login'
      )
    })

    return () => {
      unsubscibed()
    }
  }, [router.events])

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  )
}
