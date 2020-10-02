export function heatMapColorforValue(value) {
    var h = (1.0 - value) * 240;
    return 'hsl(' + h + ', 100%, 50%)';
}
