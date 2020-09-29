import { useState } from "react";

function Game({ data }) {
  const PLAYER = "PLAYER";
  const OPPONENT = "OPPONENT";

  const [visibleBoard, setVisibleBoard] = useState(PLAYER);

  function toggleBoard() {
    if (visibleBoard == PLAYER) {
      setVisibleBoard(OPPONENT);
    } else {
      setVisibleBoard(PLAYER);
    }
  }

  return (
    <main className="w-screen p-5 flex flex-col">
      <h1 className="text-2xl">Game page {data.game_hash}</h1>

      <div className="flex items-center justify-between my-2">
        {visibleBoard == PLAYER ? <h2>Ma flotte</h2>:<h2>Flotte Adverse</h2>}
        
        <button onClick={() => toggleBoard()} className="btn-blue">
          {visibleBoard == PLAYER ? 'Voir la flotte Adverse':'Voir ma flotte'}
        </button>
      </div>

      <div className="relative pb-full">
        {visibleBoard == PLAYER ? (
          <>
            
            <div className="absolute grid grid-cols-10 grid-rows-10 w-full h-full gap-px max-w-lg max-h-lg">
              {createSquares().map((square, i) => (
                <div key={i} className="w-full h-full bg-blue-500"></div>
              ))}
            </div>
            <div className="absolute grid grid-cols-10 grid-rows-10 w-full h-full gap-px max-w-lg max-h-lg">
              {data.ships.map((ship, i) => (
                <div
                  key={i}
                  className="p-1"
                  style={formatGridAttributes(ship.grid_attributes)}
                >
                  <div className="w-full h-full bg-green-500 rounded-full"></div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <>
            <div className="absolute grid grid-cols-10 grid-rows-10 w-full h-full gap-px max-w-lg max-h-lg">
              {createSquares().map((square, i) => (
                <div key={i} className="w-full h-full bg-blue-500"></div>
              ))}
            </div>
          </>
        )}
      </div>
    </main>
  );
}

export async function getServerSideProps(context) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/games/${context.params.hash}`);
  const data = await res.json();
  return { props: { data } };
}

const createSquares = () => {
  const squares = [];
  for (let i = 0; i < 100; i++) {
    squares.push(i);
  }
  return squares;
};

const formatGridAttributes = (str) => {
  const res = str
    .replace(/\s/g, "")
    .split(";")
    .reduce((acc, attr) => {
      const [key, value] = attr.split(":");
      return {
        ...acc,
        [snakeToCamel(key)]: value,
      };
    }, {});

  return res;
};

const snakeToCamel = (str) =>
  str.replace(/([-_][a-z])/g, (group) =>
    group.toUpperCase().replace("-", "").replace("_", "")
  );

export default Game;
