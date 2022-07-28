import { useRouter } from 'next/router'
import React, { createContext, FC, ReactNode, useEffect, useState } from 'react'
import { auth } from '../firebase/config'

type User = {
  displayName: string
  email: string
  photoURL: string
  uid: string
}

interface AuthContextType {
  user: User
}

const initAuthContextState: AuthContextType = {
  user: { displayName: '', email: '', photoURL: '', uid: '' },
}

export const AuthContext = createContext(initAuthContextState)
interface AuthProviderProps {
  children: ReactNode
}

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User>({
    displayName: '',
    email: '',
    photoURL: '',
    uid: '',
  })
  const router = useRouter()

  useEffect(() => {
    const unsubscibed = auth.onAuthStateChanged((user) => {
      if (user) {
        const { displayName, email, uid, photoURL } = user
        setUser({
          displayName: displayName as string,
          email: email as string,
          uid,
          photoURL: photoURL as string,
        })
        router.push('/', undefined, { shallow: true })
        return
      }

      setUser({
        displayName: '',
        email: '',
        photoURL: '',
        uid: '',
      })
      router.push(
        window.location.pathname === '/register' ? '/register' : '/login',
        undefined,
        { shallow: true }
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
