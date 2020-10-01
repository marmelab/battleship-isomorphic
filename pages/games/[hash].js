import { useState, useEffect } from 'react';
import * as api from '../../api';
import Link from 'next/link';

const PLAYER = 'PLAYER';
const OPPONENT = 'OPPONENT';

const GAME_OPEN = 'OPEN';
const GAME_OVER = 'OVER';

function Game({ data, playerHash }) {
    const [visibleBoard, setVisibleBoard] = useState(PLAYER);
    const [shoots, setShoots] = useState(data.shoots);
    const [hits, setHits] = useState(data.hits);
    const [currentPlayer, setCurrentPlayer] = useState(data.current_player);
    const [opponentSunkShips, setOpponentSunkShips] = useState(
        data.opponent_sunk_ships
    );
    const [gameStatus, setGameStatus] = useState(data.game_status);
    const [winner, setWinner] = useState(data.winner);

    const isCurrentPlayer = currentPlayer.hash === playerHash;
    const isGameOpen = gameStatus === GAME_OPEN;
    const isGameOver = gameStatus === GAME_OVER;

    function toggleBoard() {
        setVisibleBoard(visibleBoard === PLAYER ? OPPONENT : PLAYER);
    }

    async function refreshGameState() {
        const res = await api.getGame(data.game, playerHash);
        setCurrentPlayer(res.current_player);
        setGameStatus(res.game_status);
        setHits(res.hits);
        setShoots(res.shoots);
        setOpponentSunkShips(res.opponent_sunk_ships);
        setWinner(res.winner);
    }

    async function shoot(x, y) {
        const res = await api.shoot(data.game, playerHash, [x, y]);
        refreshGameState();
    }

    useEffect(() => {
        if (isCurrentPlayer) {
            return;
        }

        const interval = setInterval(() => {
            refreshGameState();
        }, 1000);

        return () => clearInterval(interval);
    }, [isCurrentPlayer]);

    useEffect(() => {
        if (!isGameOpen) {
            return;
        }

        const interval = setInterval(() => {
            refreshGameState();
        }, 1000);

        return () => clearInterval(interval);
    }, [isGameOpen]);

    return (
        <main className="w-screen h-screen p-5 flex flex-col">
            {isGameOpen && (
                <div className="fixed inset-0 z-50 w-screen h-screen bg-black bg-opacity-50">
                    <div className="flex w-full h-full items-center justify-center text-white text-3xl uppercase text-center">
                        En attente
                        <br />
                        de l' adversaire
                    </div>
                </div>
            )}
            {isGameOver && (
                <div className="fixed inset-0 z-50 w-screen h-screen bg-white">
                    <div className="flex flex-col w-full h-full items-center justify-center uppercase text-center">
                        {winner && winner.hash === playerHash ? (
                            <p className="text-4xl uppercase text-blue-500">
                                Gagné
                            </p>
                        ) : (
                            <p className="text-4xl uppercase text-red-500">
                                Perdu
                            </p>
                        )}
                        <Link href="/">
                            <button className="btn-blue mt-4">
                                Retourner à l'accueil
                            </button>
                        </Link>
                    </div>
                </div>
            )}
            <h1 className="text-2xl">
                Partie <span className="game-hash">{data.game}</span>
            </h1>
            {isCurrentPlayer ? (
                <h2 className="text-green-500 font-bold uppercase">
                    A moi de jouer
                </h2>
            ) : (
                <h2 className="text-orange-500 font-bold uppercase">
                    En attente de l'adversaire
                </h2>
            )}
            <div className="flex items-center justify-between my-2">
                {visibleBoard === PLAYER ? (
                    <h2>Ma flotte</h2>
                ) : (
                    <h2>Flotte Adverse</h2>
                )}

                <button onClick={() => toggleBoard()} className="btn-blue">
                    {visibleBoard === PLAYER
                        ? 'Voir la flotte Adverse'
                        : 'Voir ma flotte'}
                </button>
            </div>
            <div className="relative pb-full">
                <div className="absolute grid grid-cols-10 grid-rows-10 w-full h-full gap-px max-w-lg max-h-lg">
                    {[...Array(100).keys()].map((square, i) => (
                        <div
                            key={i}
                            className="w-full h-full bg-blue-500"
                        ></div>
                    ))}
                </div>
                {visibleBoard === PLAYER ? (
                    <>
                        <div className="absolute grid grid-cols-10 grid-rows-10 w-full h-full gap-px max-w-lg max-h-lg">
                            {data.ships.map((ship, i) => (
                                <div
                                    key={ship.id}
                                    className="ship p-1"
                                    style={formatGridAttributes(
                                        ship.grid_attributes
                                    )}
                                >
                                    <div className="w-full h-full bg-green-500 rounded-full"></div>
                                </div>
                            ))}
                        </div>
                    </>
                ) : (
                    <>
                        <div className="shoots-grid absolute grid grid-cols-10 grid-rows-10 w-full h-full gap-px max-w-lg max-h-lg">
                            {shoots.map((shoot, i) => (
                                <div
                                    key={shoot.id}
                                    style={{
                                        gridRowStart: shoot.coordinates[0] + 1,
                                        gridColumnStart:
                                            shoot.coordinates[1] + 1,
                                    }}
                                >
                                    <div className="w-full h-full bg-yellow-500"></div>
                                </div>
                            ))}
                        </div>
                        <div className="absolute grid grid-cols-10 grid-rows-10 w-full h-full gap-px max-w-lg max-h-lg">
                            {hits.map((hit, i) => (
                                <div
                                    key={hit.id}
                                    style={{
                                        gridRowStart: hit.coordinates[0] + 1,
                                        gridColumnStart: hit.coordinates[1] + 1,
                                    }}
                                >
                                    <div className="w-full h-full bg-red-500"></div>
                                </div>
                            ))}
                        </div>
                        <div className="absolute grid grid-cols-10 grid-rows-10 w-full h-full gap-px max-w-lg max-h-lg">
                            {opponentSunkShips.map((ship, i) => (
                                <div
                                    key={ship.id}
                                    className=""
                                    style={formatGridAttributes(
                                        ship.grid_attributes
                                    )}
                                >
                                    <div className="w-full h-full bg-black"></div>
                                </div>
                            ))}
                        </div>
                        {isCurrentPlayer && (
                            <div className="shooting-grid absolute grid grid-cols-10 grid-rows-10 w-full h-full gap-px max-w-lg max-h-lg">
                                {[...Array(10).keys()].map((square, x) =>
                                    [...Array(10).keys()].map((square, y) => (
                                        <div
                                            key={x + y}
                                            className="w-full h-full"
                                            onClick={() => shoot(x, y)}
                                        ></div>
                                    ))
                                )}
                            </div>
                        )}
                    </>
                )}
            </div>
        </main>
    );
}

export async function getServerSideProps(context) {
    const data = await api.getGame(
        context.params.hash,
        context.query.player_hash
    );
    return { props: { data, playerHash: context.query.player_hash } };
}

const formatGridAttributes = str => {
    const res = str
        .replace(/\s/g, '')
        .split(';')
        .reduce((acc, attr) => {
            const [key, value] = attr.split(':');
            return {
                ...acc,
                [snakeToCamel(key)]: value,
            };
        }, {});

    return res;
};

const snakeToCamel = str =>
    str.replace(/([-_][a-z])/g, group =>
        group.toUpperCase().replace('-', '').replace('_', '')
    );

export default Game;
