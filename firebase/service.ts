import { db } from './config'
import { serverTimestamp, setDoc, doc } from 'firebase/firestore'

type Data = {
  displayName: string
  email: string
  photoUrl: string
  uid: string
  providerId: string
  keywords: string[]
}

export const addDocument = (collectionName: string, data: Data) => {
  setDoc(doc(db, collectionName, data.uid), {
    ...data,
    creteAt: serverTimestamp(),
  })
}
