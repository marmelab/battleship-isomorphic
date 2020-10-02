import { formatGridAttributes } from './formatGridAttributes';
import { ShootingGrid } from './ShootingGrid';
import { Shot } from './Shot';

export function OpponentBoard({ shoots, hits, opponentSunkShips, shoot }) {
    return (
        <>
            <div className="shoots-grid absolute grid grid-cols-10 grid-rows-10 w-full h-full gap-px max-w-lg max-h-lg">
                {shoots.map((shot, i) => (
                    <Shot shot={shot} color={'yellow'} />
                ))}
            </div>
            <div className="absolute grid grid-cols-10 grid-rows-10 w-full h-full gap-px max-w-lg max-h-lg">
                {hits.map((hit, i) => (
                    <Shot shot={hit} color={'red'} />
                ))}
            </div>
            <div className="absolute grid grid-cols-10 grid-rows-10 w-full h-full gap-px max-w-lg max-h-lg">
                {opponentSunkShips.map((ship, i) => (
                    <div
                        key={ship.id}
                        style={formatGridAttributes(ship.grid_attributes)}
                    >
                        <div className="w-full h-full bg-black"></div>
                    </div>
                ))}
            </div>

            <ShootingGrid shoot={shoot} />
        </>
    );
}
