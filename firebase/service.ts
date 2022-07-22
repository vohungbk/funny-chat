import { db } from './config'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'

type Data = {
  displayName: string
  email: string
  photoUrl: string
  uid: string
  providerId: string
}

export const addDocument = (collectionName: string, data: Data) => {
  const dbRef = collection(db, collectionName)

  addDoc(dbRef, { ...data, creteAt: serverTimestamp() })
    .then(() => {
      console.log('Document has been added successfully')
    })
    .catch((error) => {
      console.log(error)
    })
}
