import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import Layout from '@/components/layout'
import { useRouter } from 'next/router';
import { useEffect } from 'react'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const router = useRouter();

  const token = typeof window !== 'undefined' && window.localStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      router.push('/login');
    }
  })  

  return (
    <>
      <Head>
        <title>Attendance</title>
        <meta name="description" content="" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Layout />
      </main>
    </>
  )
}
