import { initializeApp } from 'firebase/app'
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore'
import firebase from 'firebase/app'
import { connectAuthEmulator, getAuth, GoogleAuthProvider } from 'firebase/auth'

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: 'funny-chat-6bad3.firebaseapp.com',
  projectId: 'funny-chat-6bad3',
  storageBucket: 'funny-chat-6bad3.appspot.com',
  messagingSenderId: '933167502832',
  appId: process.env.NEXT_PUBLIC_API_KEY,
  measurementId: 'G-7BNQ04N2XK',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

export const db = getFirestore(app)
export const auth = getAuth()
export const provider = new GoogleAuthProvider()
provider.setCustomParameters({ prompt: 'select_account' })

connectAuthEmulator(auth, 'http://localhost:9099')

if (typeof window !== 'undefined' && window.location.hostname === 'localhost') {
  connectFirestoreEmulator(db, 'localhost', 8080)
}

export default firebase
