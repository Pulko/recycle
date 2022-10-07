import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { MyMap } from '../components/map'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  return (
    <MyMap />
  )
}

export default Home
