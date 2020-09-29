import Head from 'next/head';
import { useRouter } from 'next/router';
import * as api from '../api';

function Home({ data }) {
    const router = useRouter();

    async function createGame() {
        const newGame = await api.createGame();
        router.push(`/games/${newGame.game_hash}`);
    }

    async function joinGame(gameHash) {
        const game = await api.joinGame(gameHash);
        router.push(`/games/${game.game_hash}`);
    }

    return (
        <div>
            <Head>
                <title>Battleship</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <div className="flex flex-col pt-20 h-screen">
                <h1 className="text-4xl text-red-500 text-center">
                    Welcome to the Battleship!
                </h1>
                <div className="self-center">
                    <button className="mt-20 btn-blue" onClick={createGame}>
                        Create new game
                    </button>
                </div>

                <div className="mx-4 mt-8">
                    <h2 className="text-xl font-bold px-3 mb-4">Open Games</h2>
                    <ul className="flex flex-col border-t border-gray-300">
                        {data.games.map((game, index) => (
                            <li
                                key={game.id}
                                className="border-b border-gray-300 py-3 px-3 flex items-center justify-between"
                            >
                                <span>{game.hash}</span>
                                <button
                                    className="btn-blue"
                                    onClick={() => joinGame(game.hash)}
                                >
                                    JOIN
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export async function getServerSideProps() {
    const data = await api.getGames();
    return { props: { data } };
}

export default Home;
