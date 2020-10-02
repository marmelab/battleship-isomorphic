import { useState, useEffect } from 'react';
import * as api from '../../api';
import Link from 'next/link';
import { OpponentBoard, PlayerBoard } from '../../src';

const GAME_OPEN = 'OPEN';
const GAME_OVER = 'OVER';

export default function Game({ data, playerHash }) {
    const [shoots, setShoots] = useState(data.shoots);
    const [hits, setHits] = useState(data.hits);
    const [currentPlayer, setCurrentPlayer] = useState(data.current_player);
    const [opponentSunkShips, setOpponentSunkShips] = useState(
        data.opponent_sunk_ships
    );
    const [gameStatus, setGameStatus] = useState(data.game_status);
    const [winner, setWinner] = useState(data.winner);
    const [opponentHits, setOpponentHits] = useState(data.hits);
    const [opponentShoots, setOpponentShoots] = useState(data.hits);
    const [displayMessage, setDisplayMessage] = useState(false);
    const [message, setMessage] = useState('');
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [isLinkCopied, setIsLinkeCopied] = useState(false);

    const isCurrentPlayer = currentPlayer.hash === playerHash;
    const isGameOpen = gameStatus === GAME_OPEN;
    const isGameOver = gameStatus === GAME_OVER;

    async function refreshGameState() {
        setIsRefreshing(true);
        const res = await api.getGame(data.game, playerHash);

        setOpponentHits(res.opponent_hits);
        setOpponentShoots(res.opponent_shoots);

        setTimeout(function () {
            setCurrentPlayer(res.current_player);
            setGameStatus(res.game_status);
            setHits(res.hits);
            setShoots(res.shoots);
            setOpponentSunkShips(res.opponent_sunk_ships);
            setWinner(res.winner);
            setIsRefreshing(false);
        }, 2000);
    }

    async function shoot(x, y) {
        if (isRefreshing) {
            return;
        }

        const res = await api.shoot(data.game, playerHash, [x, y]);
        setHits(res.hits);
        setShoots(res.shoots);

        if (res.did_hit) {
            setMessage('TOUCHE');
        } else {
            setMessage('LOUPE');
        }
        setDisplayMessage(true);

        setTimeout(function () {
            refreshGameState();
            setDisplayMessage(false);
        }, 2000);
    }

    function copyToClipBoard() {
        var copyText = document.getElementById('joinLink');

        copyText.select();
        copyText.setSelectionRange(0, 99999); /*For mobile devices*/

        document.execCommand('copy');
        setIsLinkeCopied(true);
        setTimeout(function () {
            setIsLinkeCopied(false);
        }, 2000);
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
        <main className="container mx-auto">
            {isGameOpen && (
                <div className="fixed inset-0 z-50 w-screen h-screen bg-white">
                    <div className="flex flex-col w-full h-full items-center justify-center uppercase text-center">
                        <p className="text-3xl mb-8">En attente</p>
                        <p>Partagez ce lien pour rejoindre la partie</p>
                        <input
                            type="text"
                            readOnly
                            value={`${process.env.NEXT_PUBLIC_BASE_URL}/join/${data.game}`}
                            id="joinLink"
                            className="mb-4"
                        />
                        <button
                            className={isLinkCopied ? 'btn-green' : 'btn-blue'}
                            onClick={copyToClipBoard}
                        >
                            {isLinkCopied ? (
                                <span>Lien copié</span>
                            ) : (
                                <span>Copier le lien</span>
                            )}
                        </button>
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
            <div className="flex flex-col items-center p-5">
                <h1 className="text-2xl">
                    Partie <span className="game-hash">{data.game}</span>
                </h1>
                {isCurrentPlayer ? (
                    <h2 className="text-green-500 font-bold uppercase">
                        A vous de jouer !
                    </h2>
                ) : (
                    <h2 className="text-orange-500 font-bold uppercase">
                        En attente de l'adversaire
                    </h2>
                )}
                <div className="relative pb-full w-full max-w-lg">
                    {displayMessage && (
                        <div className="absolute z-50 flex w-full h-full items-center justify-center">
                            <p className="text-4xl">{message}</p>
                        </div>
                    )}

                    <div className="absolute grid grid-cols-10 grid-rows-10 w-full h-full gap-px max-w-lg max-h-lg">
                        {[...Array(100).keys()].map((square, i) => (
                            <div
                                key={i}
                                className="w-full h-full bg-blue-500"
                            ></div>
                        ))}
                    </div>

                    {!isCurrentPlayer ? (
                        <PlayerBoard
                            ships={data.ships}
                            opponentShoots={opponentShoots}
                            opponentHits={opponentHits}
                        />
                    ) : (
                        <OpponentBoard
                            shoots={shoots}
                            hits={hits}
                            opponentSunkShips={opponentSunkShips}
                            shoot={shoot}
                        />
                    )}
                </div>
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
