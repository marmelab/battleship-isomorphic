import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { useRouter } from 'next/router'

export default function Home() {
  const router = useRouter()

  async function createGame() {
    const res = await fetch(`${process.env.API_HOST}/games`, {method: 'POST'})
    const data = await res.json()

    router.push(`/games/${data.game_hash}`)
  }

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
}
