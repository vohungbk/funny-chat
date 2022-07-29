import { createContext, FC, ReactNode } from 'react'

const initAppContextState = {}

export const AppContext = createContext(initAppContextState)

interface AppProviderProps {
  children: ReactNode
}

export const AppProvider: FC<AppProviderProps> = ({ children }) => {
  return <AppContext.Provider value={{}}>{children}</AppContext.Provider>
}
