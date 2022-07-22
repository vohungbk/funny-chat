import Head from 'next/head'
import { FC, ReactNode } from 'react'
import LeftAuth from '../LeftContent'

import style from './Style.module.scss'

interface AuthWrapperProps {
  children: ReactNode
}

const AuthWrapper: FC<AuthWrapperProps> = ({ children }) => {
  return (
    <>
      <Head>
        <title>Funny Chat</title>
        <meta name="description" content="Funny Chat" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section className={style.auth}>
        <div className={style.wrapper}>
          <div className={style.content}>
            <LeftAuth />
            {children}
          </div>
        </div>
      </section>
    </>
  )
}

export default AuthWrapper
