export const getGames = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/games`);
    return await res.json();
};

export const createGame = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/games`, {
        method: 'POST',
    });
    return await res.json();
};

export const getGame = async (gameHash, playerHash) => {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_HOST}/games/${gameHash}?player_hash=${playerHash}`
    );
    return await res.json();
};

export const joinGame = async gameHash => {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_HOST}/games/${gameHash}/join`,
        {
            method: 'PUT',
        }
    );
    return await res.json();
};

export const shoot = async (gameHash, playerHash, coordinates) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/shoots`, {
        method: 'POST',
        body: JSON.stringify({
            gameHash,
            playerHash,
            coordinates,
        }),
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
    });

    return await res.json();
};
