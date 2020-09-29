import styles from "../../styles/Game.module.css";

function Game({ data }) {
  return (
    <div>
      Game page {data.game_hash}
      <div className={styles.board}>
        <div className={styles.fleet}>
          {data.ships.map((ship, i) => (
            <div
              key={ship.id}
              className={styles.square}
              style={formatGridAttributes(ship.grid_attributes)}
            >
              <div className={styles.ship}>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const res = await fetch(`http://localhost/api/games/${context.params.hash}`);
  const data = await res.json();

  return { props: { data } };
}

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
