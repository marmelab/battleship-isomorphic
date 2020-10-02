import { formatGridAttributes } from './formatGridAttributes';

export function OpponentBoard({ shoots, hits, opponentSunkShips, shoot }) {
    return (
        <>
            <div className="shoots-grid absolute grid grid-cols-10 grid-rows-10 w-full h-full gap-px max-w-lg max-h-lg">
                {shoots.map((shoot, i) => (
                    <div
                        key={shoot.id}
                        style={{
                            gridRowStart: shoot.coordinates[0] + 1,
                            gridColumnStart: shoot.coordinates[1] + 1,
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
                        style={formatGridAttributes(ship.grid_attributes)}
                    >
                        <div className="w-full h-full bg-black"></div>
                    </div>
                ))}
            </div>
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
        </>
    );
}
