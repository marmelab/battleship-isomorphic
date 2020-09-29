export const getGames = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/games`);
  return await res.json();
};

export const createGame = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/games`, {
    method: "POST",
  });
  return await res.json();
};

export const joinGame = async (gameHash) => {
  console.log("join", gameHash);
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_HOST}/games/${gameHash}/join`,
    {
      method: "PUT",
    }
  );
  return await res.json();
};
