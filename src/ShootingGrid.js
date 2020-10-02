export function ShootingGrid({ shoot }) {
    return (
        <div className="shooting-grid absolute grid grid-cols-10 grid-rows-10 w-full h-full gap-px max-w-lg max-h-lg">
            {[...Array(10).keys()].map((square, x) =>
                [...Array(10).keys()].map((square, y) => (
                    <div
                        key={x + y}
                        className="w-full h-full cursor-pointer hover:bg-blue-600"
                        onClick={() => shoot(x, y)}
                    ></div>
                ))
            )}
        </div>
    );
}
