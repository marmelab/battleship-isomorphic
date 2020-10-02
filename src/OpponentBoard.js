import { formatGridAttributes } from './formatGridAttributes';
import { heatMapColorforValue } from './heatMapColorForValue';
import { ShootingGrid } from './ShootingGrid';
import { Shot } from './Shot';

export function OpponentBoard({
    shoots,
    hits,
    opponentSunkShips,
    shoot,
    heatMap,
    isVisibleHeatMap,
}) {
    return (
        <>
            <div className="heat-map absolute grid grid-cols-10 grid-rows-10 w-full h-full gap-px max-w-lg max-h-lg">
                {heatMap.map(line => (
                    <>
                        {line.map(weight => (
                            <div
                                style={
                                    isVisibleHeatMap
                                        ? {
                                              backgroundColor: heatMapColorforValue(
                                                  weight
                                              ),
                                              // backgroundColor: `hsl(207, ${
                                              //     100 - 100 / weight
                                              // }%, 50%)`,
                                          }
                                        : null
                                }
                                className="w-full h-full"
                            ></div>
                        ))}
                    </>
                ))}
            </div>

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
