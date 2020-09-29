function Game({ data }) {

  return (
    <div className="w-screen p-5 flex flex-col">
      <h1 className="text-2xl">Game page {data.game_hash}</h1>

      <div className="py-2"></div>

      <div className="relative pb-full">

        <div className="absolute grid grid-cols-10 grid-rows-10 w-full h-full gap-px max-w-lg max-h-lg">
          {createSquares().map((square, i) => (
            <div key={i} className="w-full h-full bg-blue-500"></div>
          ))}
        </div>

        <div className="absolute grid grid-cols-10 grid-rows-10 w-full h-full gap-px max-w-lg max-h-lg">
          {data.ships.map((ship, i) => (
            <div
              key={ship.id}
              className="p-1"
              style={formatGridAttributes(ship.grid_attributes)}
            >
              <div className="w-full h-full bg-green-500 rounded-full"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const res = await fetch(`${process.env.API_HOST}/games/${context.params.hash}`);
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
