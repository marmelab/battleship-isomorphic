export function Shot({ shot, color }) {
    return (
        <div
            key={shot.id}
            style={{
                gridRowStart: shot.coordinates[0] + 1,
                gridColumnStart: shot.coordinates[1] + 1,
            }}
        >
            <div className="flex w-full h-full items-center justify-center">
                <div
                    className={`w-1/2 h-1/2 bg-${color}-500 rounded-full`}
                ></div>
            </div>
        </div>
    );
}
