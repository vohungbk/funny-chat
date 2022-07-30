import Skeleton from '@Components/Skeleton'
import classNames from 'classnames'
import { AppContext } from 'context/AppProvider'
import { AuthContext } from 'context/AuthProvider'
import { useLastMessage } from 'hooks/useLastMessage'
import { useUsersInfo } from 'hooks/useUsersInfo'
import Image from 'next/image'
import { FC, useContext } from 'react'
import { IMAGE_PROXY } from 'shared/constants'
import { ConversationInfo } from 'shared/types'
import style from './Style.module.scss'

interface ListConventionProps {
  conversationId: string
  conversation: ConversationInfo
}

const ListConvention: FC<ListConventionProps> = ({
  conversationId,
  conversation,
}) => {
  const { data: users, loading } = useUsersInfo(conversation.users)
  const { user } = useContext(AuthContext)
  const { selectedId, setSelectedId } = useContext(AppContext)

  const filtered = users?.filter((us) => us?.data()?.uid !== user.uid)

  const { data: lastMessage, loading: lastMessageLoading } =
    useLastMessage(conversationId)

  if (loading)
    return (
      <div className={style.loading}>
        <Skeleton className={style.loadingFull} />
        <div className={style.content}>
          <Skeleton className={style.loadingHaft} />
          <Skeleton className={style.loadingThree} />
        </div>
      </div>
    )

  if (conversation.users.length === 2)
    return (
      <a
        className={classNames([
          style.conventions,
          { [style.active]: conversationId === selectedId },
        ])}
        onClick={() => setSelectedId(conversationId)}
      >
        <Image
          src={IMAGE_PROXY(filtered?.[0]?.data()?.photoUrl)}
          alt=""
          objectFit="cover"
          height={56}
          width={56}
          style={{ borderRadius: '9999px' }}
        />

        <div className={style.messages}>
          <p className={style.text}>{filtered?.[0].data()?.displayName}</p>
          {lastMessageLoading ? (
            <Skeleton className={style.loadingThree} />
          ) : (
            <p className={classNames([style.text, style.message])}>
              {lastMessage?.message}
            </p>
          )}
        </div>
        {!lastMessageLoading && (
          <>
            {lastMessage?.lastMessageId !== null &&
              lastMessage?.lastMessageId !==
                conversation.seen[user?.uid as string] && (
                <div className={style.unread}></div>
              )}
          </>
        )}
      </a>
    )

  return (
    <a
      className={classNames([
        style.conventions,
        style.group,
        { [style.active]: conversationId === selectedId },
      ])}
      onClick={() => setSelectedId(conversationId)}
    >
      {conversation?.group?.groupImage ? (
        <Image
          src={conversation.group.groupImage}
          alt=""
          height={56}
          width={56}
          objectFit="cover"
        />
      ) : (
        <div className={style.groupAvatar}>
          <Image
            src={IMAGE_PROXY(filtered?.[0]?.data()?.photoURL)}
            alt=""
            height={40}
            width={40}
            objectFit="cover"
          />

          <Image
            src={IMAGE_PROXY(filtered?.[1]?.data()?.photoURL)}
            alt=""
            height={40}
            width={40}
            objectFit="cover"
            style={{
              borderColor: conversationId === selectedId ? 'rgb(37 47 60)' : '',
            }}
          />
        </div>
      )}
      <div className={style.messages}>
        <p className={style.text}>
          {conversation?.group?.groupName ||
            filtered
              ?.map((user) => user.data()?.displayName)
              .slice(0, 3)
              .join(', ')}
        </p>
        {lastMessageLoading ? (
          <Skeleton className={style.loadingThree} />
        ) : (
          <p className={classNames([style.text, style.message])}>
            {lastMessage?.message}
          </p>
        )}
      </div>
      {!lastMessageLoading && (
        <>
          {lastMessage?.lastMessageId !== null &&
            lastMessage?.lastMessageId !==
              conversation.seen[user?.uid as string] && (
              <div className={style.unread}></div>
            )}
        </>
      )}
    </a>
  )
}

export default ListConvention
