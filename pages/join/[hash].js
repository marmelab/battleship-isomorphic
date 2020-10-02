import { useEffect } from 'react';
import * as api from '../../api';
import { useRouter } from 'next/router';

function Join({ gameHash, playerHash }) {
    const router = useRouter();

    useEffect(() => {
        if (gameHash && playerHash) {
            setTimeout(function () {
                router.replace(`/games/${gameHash}?player_hash=${playerHash}`);
            }, 2000);
        }

        return;
    }, [gameHash, playerHash]);

    return (
        <main className="container mx-auto">
            <div className="flex h-screen items-center justify-center">
                <p className="text-center text-2xl">
                    Connexion à la partie <br /> {gameHash}
                </p>
            </div>
        </main>
    );
}

export async function getServerSideProps(context) {
    const data = await api.joinGame(context.params.hash);

    return {
        props: { gameHash: data.game_hash, playerHash: data.player_hash },
    };
}

export default Join;
