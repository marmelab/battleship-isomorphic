import { formatGridAttributes } from './formatGridAttributes';
import { Shot } from './Shot';

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
                {opponentShoots.map(shot => (
                    <Shot key={shot.id} shot={shot} color={'yellow'} />
                ))}
            </div>
            <div className="absolute grid grid-cols-10 grid-rows-10 w-full h-full gap-px max-w-lg max-h-lg">
                {opponentHits.map(hit => (
                    <Shot key={hit.id} shot={hit} color={'red'} />
                ))}
            </div>
        </>
    );
}
