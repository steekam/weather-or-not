export function degreesToCompassDirection(degrees: number) {
    const directions = ['North', 'NNE', 'NE', 'ENE', 'Eeast', 'ESE', 'SE', 'SSE', 'South', 'SSW', 'SW', 'WSW', 'West', 'WNW', 'NW', 'NNW'] as const;
    const index = Math.round((degrees / 22.5) % 16);
    return directions[(index + 16) % 16];
}