import { formatGridAttributes } from './formatGridAttributes';
import { ShootingGrid } from './ShootingGrid';
import { Shot } from './Shot';

export function OpponentBoard({ shoots, hits, opponentSunkShips, shoot }) {
    return (
        <>
            <div className="shoots-grid absolute grid grid-cols-10 grid-rows-10 w-full h-full gap-px max-w-lg max-h-lg">
                {shoots.map(shot => (
                    <Shot key={shot.id} shot={shot} color={'yellow'} />
                ))}
            </div>
            <div className="absolute grid grid-cols-10 grid-rows-10 w-full h-full gap-px max-w-lg max-h-lg">
                {hits.map(hit => (
                    <Shot key={hit.id} shot={hit} color={'red'} />
                ))}
            </div>
            <div className="absolute grid grid-cols-10 grid-rows-10 w-full h-full gap-px max-w-lg max-h-lg">
                {opponentSunkShips.map(ship => (
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
