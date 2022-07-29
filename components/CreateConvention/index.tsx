import Popup from '@Components/Popup'
import { AuthContext } from 'context/AuthProvider'
import { db } from '../../firebase/config'
import {
  addDoc,
  collection,
  getDocs,
  query,
  serverTimestamp,
  where,
} from 'firebase/firestore'
import Image from 'next/image'
import { FC, useContext, useState } from 'react'
import { DEFAULT_AVATAR, IMAGE_PROXY, THEMES } from 'shared/constants'
import style from './Style.module.scss'
import { useFireStore } from 'hooks/useFirestore'
import Loading from '@Components/Loading'
import Error from '@Components/Error'

interface CreateConventionProps {
  open: boolean
  setOpenModal: (open: boolean) => void
}

const CreateConvention: FC<CreateConventionProps> = ({
  open,
  setOpenModal,
}) => {
  const { data, error, loading } = useFireStore(
    'all-users',
    collection(db, 'users')
  )

  const [selected, setSelected] = useState<string[]>([])
  const [isCreating, setIsCreating] = useState(false)
  const { user } = useContext(AuthContext)

  const handleToggle = (uid: string) => {
    if (selected.includes(uid)) {
      setSelected(selected.filter((item) => item !== uid))
    } else {
      setSelected([...selected, uid])
    }
  }

  const handleCreateConversation = async () => {
    setIsCreating(true)

    const sorted = [...selected, user?.uid].sort()

    console.log(sorted)

    const q = query(
      collection(db, 'conversations'),
      where('users', '==', sorted)
    )

    const querySnapshot = await getDocs(q)

    if (querySnapshot.empty) {
      const created = await addDoc(collection(db, 'conversations'), {
        users: sorted,
        group:
          sorted.length > 2
            ? {
                admins: [user?.uid],
                groupName: null,
                groupImage: null,
              }
            : {},
        updatedAt: serverTimestamp(),
        seen: {},
        theme: THEMES[0],
      })

      setIsCreating(false)

      setOpenModal(false)

      console.log(created)

      // navigate(`/${created.id}`)
    } else {
      setOpenModal(false)

      // navigate(`/${querySnapshot.docs[0].id}`)

      setIsCreating(false)
    }
  }

  data?.docs.map((doc) => console.log('!23', doc.data()))

  const Footer = (
    <div className={style.footer}>
      <button
        disabled={selected.length === 0}
        onClick={handleCreateConversation}
        className={style.btnCreate}
      >
        Start conversation
      </button>
    </div>
  )

  return (
    <Popup
      open={open}
      title="New Convention"
      onHide={() => setOpenModal(!open)}
      footer={Footer}
    >
      {loading ? (
        <Loading />
      ) : error ? (
        <Error />
      ) : (
        <>
          {isCreating && <Loading />}
          <div className={style.contentPopup}>
            {data?.docs
              .filter((doc) => doc.data()?.uid !== user.uid)
              .map((item) => (
                <div
                  className={style.listConvention}
                  onClick={() => handleToggle(item.data().uid)}
                  key={item.data().uid}
                >
                  <input
                    type="checkbox"
                    checked={selected.includes(item.data().uid)}
                    readOnly
                  />

                  <Image
                    src={IMAGE_PROXY(item.data().photoUrl) || DEFAULT_AVATAR}
                    alt=""
                    width={32}
                    height={32}
                    objectFit="cover"
                  />
                  <p>{item.data().displayName}</p>
                </div>
              ))}
          </div>
        </>
      )}
    </Popup>
  )
}

export default CreateConvention
