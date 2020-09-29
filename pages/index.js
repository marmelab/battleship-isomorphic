import Head from "next/head";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();

  async function createGame() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/games`, {method: 'POST'})
    const data = await res.json()

    router.push(`/games/${data.game_hash}`);
  }

  return (
    <div>
      <Head>
        <title>Battleship</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex flex-col py-20">
        <h1 className="text-4xl text-red-500 text-center">
          Welcome to the Battleship!
        </h1>
        <div className="self-center">
          <button className="mt-20 btn-blue" onClick={createGame}>
            Create new game
          </button>
        </div>
      </div>
    </div>
  );
}
