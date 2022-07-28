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
        <link
          href="https://unpkg.com/boxicons@2.1.1/css/boxicons.min.css"
          rel="stylesheet"
        />
      </Head>
      <div style={{ display: 'flex' }}>
        <Sidebar />
      </div>
    </>
  )
}

export default Home
