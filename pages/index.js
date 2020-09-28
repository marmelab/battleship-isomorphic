import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { useRouter } from 'next/router'

export default function Home() {
  const router = useRouter()

  return (
    <div className={styles.container}>
      <Head>
        <title>Battleship</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <button className="{styles.button}" onClick={createGame}>
          Create new game
        </button>
      </main>
    </div>
  )

  async function createGame() {
    const res = await fetch('http://localhost/api/games', {method: 'POST'})
    const json = await res.json()

    console.log(json)

    router.push('/game')
  }
}
