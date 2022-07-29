import Sidebar from '@Components/Sidebar'
import type { NextPage } from 'next'
import Head from 'next/head'

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Funny Chat</title>
        <meta name="description" content="Funny Chat" />
        <link rel="icon" href="/favicon.ico" />
       
      </Head>
      <div style={{ display: 'flex' }}>
        <Sidebar />
      </div>
    </>
  )
}

export default Home
