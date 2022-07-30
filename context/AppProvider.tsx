import { createContext, FC, ReactNode, useState } from 'react'

interface initAppContextState {
  setSelectedId: (id: string) => void
  selectedId: string
  clearState: () => void
}

const initAppContext: initAppContextState = {
  setSelectedId: () => null,
  selectedId: '',
  clearState: () => null,
}

export const AppContext = createContext(initAppContext)

interface AppProviderProps {
  children: ReactNode
}

export const AppProvider: FC<AppProviderProps> = ({ children }) => {
  const [selectedId, setSelectedId] = useState('')

  const clearState = () => {
    setSelectedId('')
  }

  return (
    <AppContext.Provider value={{ selectedId, setSelectedId, clearState }}>
      {children}
    </AppContext.Provider>
  )
}
