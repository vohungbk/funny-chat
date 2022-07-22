import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import { AuthProvider } from '../context/AuthProvider'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
      <ToastContainer hideProgressBar />
    </AuthProvider>
  )
}

export default MyApp
