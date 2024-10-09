import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { auth } from '@/config/firebase'

export default function Home() {
  const router = useRouter()

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        router.push('/alerts')
      } else {
        router.push('/login')
      }
    })

    return () => unsubscribe()
  }, [router])

  return (
    <>
      <Head>
        <title>VigilantEye App</title>
        <meta name="description" content="VigilantEye App - Monitoring and Alerts" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1>Loading...</h1>
      </main>
    </>
  )
}