import { formatGridAttributes } from './formatGridAttributes';

export function PlayerBoard({ ships, opponentShoots, opponentHits }) {
    return (
        <>
            <div className="absolute grid grid-cols-10 grid-rows-10 w-full h-full gap-px max-w-lg max-h-lg">
                {ships.map((ship, i) => (
                    <div
                        key={ship.id}
                        className="ship p-1"
                        style={formatGridAttributes(ship.grid_attributes)}
                    >
                        <div className="w-full h-full bg-green-500 rounded-full"></div>
                    </div>
                ))}
            </div>
            <div className="absolute grid grid-cols-10 grid-rows-10 w-full h-full gap-px max-w-lg max-h-lg">
                {opponentShoots.map((shoot, i) => (
                    <div
                        key={shoot.id}
                        style={{
                            gridRowStart: shoot.coordinates[0] + 1,
                            gridColumnStart: shoot.coordinates[1] + 1,
                        }}
                    >
                        <div className="flex w-full h-full items-center justify-center">
                            <div className="w-1/2 h-1/2 bg-yellow-500 rounded-full"></div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="absolute grid grid-cols-10 grid-rows-10 w-full h-full gap-px max-w-lg max-h-lg">
                {opponentHits.map((hit, i) => (
                    <div
                        key={hit.id}
                        style={{
                            gridRowStart: hit.coordinates[0] + 1,
                            gridColumnStart: hit.coordinates[1] + 1,
                        }}
                    >
                        <div className="flex w-full h-full items-center justify-center">
                            <div className="w-1/2 h-1/2 bg-red-500 rounded-full"></div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}
