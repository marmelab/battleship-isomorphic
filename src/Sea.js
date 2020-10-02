export function Sea() {
    return (
        <div className="absolute grid grid-cols-10 grid-rows-10 w-full h-full gap-px max-w-lg max-h-lg">
            {[...Array(100).keys()].map((square, i) => (
                <div key={i} className="w-full h-full bg-blue-500"></div>
            ))}
        </div>
    );
}
