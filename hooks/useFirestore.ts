import {
  onSnapshot,
  DocumentData,
  CollectionReference,
  Query,
} from 'firebase/firestore'
import { useEffect, useState } from 'react'

const useFireStore = (
  collectionName: string,
  query: CollectionReference | Query<DocumentData>
) => {
  const [data, setData] = useState<DocumentData[]>([])
  const [loading, setLoading] = useState(!data)
  const [error, setError] = useState(false)

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query,
      (querySnapshot) => {
        const data: DocumentData[] = []
        querySnapshot.forEach((doc) => {
          data.push({ ...doc.data(), id: doc.id })
        })
        setData(data)
        setLoading(false)
        setError(false)
      },
      () => {
        setData([])
        setLoading(false)
        setError(true)
      }
    )
    return () => {
      unsubscribe()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [collectionName])

  return { loading, error, data }
}

export default useFireStore
