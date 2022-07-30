/* eslint-disable @typescript-eslint/no-explicit-any */
import { db } from '../firebase/config'
import { DocumentData, DocumentSnapshot, doc, getDoc } from 'firebase/firestore'
import { useEffect, useState } from 'react'

const cache: { [key: string]: any } = {}

export const useUsersInfo = (userIds: string[]) => {
  const [data, setData] = useState<DocumentSnapshot<DocumentData>[] | null>(
    userIds.every((id) => cache[id]) ? userIds.map((id) => cache[id]) : null
  )
  const [loading, setLoading] = useState(!data)
  const [error, setError] = useState(false)

  useEffect(() => {
    try {
      ;(async () => {
        const response = await Promise.all(
          userIds.map(async (id) => {
            if (cache[id]) return cache[id]
            const docRef = doc(db, 'users', id)
            const res = await getDoc(docRef)

            cache[id] = res
            return res
          })
        )
        setData(response)
        setLoading(false)
        setError(false)
      })()
    } catch (error) {
      setLoading(false)
      setError(true)
    }
  }, [JSON.stringify(userIds)])

  return { data, loading, error }
}
