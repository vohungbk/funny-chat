import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import { AuthProvider } from '../context/AuthProvider'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { AppProvider } from 'context/AppProvider'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <AppProvider>
        <Component {...pageProps} />
        <ToastContainer hideProgressBar />
      </AppProvider>
    </AuthProvider>
  )
}

export default MyApp
