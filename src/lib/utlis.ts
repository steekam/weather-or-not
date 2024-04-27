export function degreesToCompassDirection(degrees: number) {
    const directions = ['North', 'NNE', 'NE', 'ENE', 'East', 'ESE', 'SE', 'SSE', 'South', 'SSW', 'SW', 'WSW', 'West', 'WNW', 'NW', 'NNW'] as const;
    const index = Math.round((degrees / 22.5) % 16);
    return directions[(index + 16) % 16];
}

export const uviComments = {
    veryLow: "👍🏾 Very safe outside",
    low: "🕶️ A bit toasty outside",
    hot: "🔥Wear SPF 50+",
    veryHot: "🤒️Protect your skin!",
    extreme: "🚫 Stay inside"
} as const;

export function uviValueComment(value: number) {
    value = Math.floor(value);

    if (value >= 0 && value <= 2) {
        return uviComments.veryLow;
    } else if (value >= 3 && value <= 5) {
        return uviComments.low;
    } else if (value >= 6 && value <= 7) {
        return uviComments.hot;
    } else if (value >= 8 && value <= 10) {
        return uviComments.veryHot;
    } else {
        return uviComments.extreme;
    }
}

export const humidityComments = {
    low: "You might need a camel!",
    medium: "Goldilocks level",
    average: "Don't forget your umbrella!",
    wet: "Humid jungle out there!"
} as const;

export function getHumidityComment(humidityLevel: number) {
    if (humidityLevel < 30) {
        return humidityComments.low;
    } else if (humidityLevel >= 30 && humidityLevel < 50) {
        return humidityComments.medium;
    } else if (humidityLevel >= 50 && humidityLevel < 70) {
        return humidityComments.average;
    } else {
        return humidityComments.wet;
    }
}

export const visibilityComments = {
    low: "Take extra caution!",
    medium: "Drive carefully!",
    average: "Stay alert!",
    great: "Enjoy the clear views!"
} as const;

export function getVisibilityComment(visibility: number) {
    if (visibility < 2) {
        return visibilityComments.low;
    } else if (visibility >= 2 && visibility < 5) {
        return visibilityComments.medium;
    } else if (visibility >= 5 && visibility < 8) {
        return visibilityComments.average;
    } else {
        return visibilityComments.great;
    }
}

const airPressureComments = {
    low: "🌧️ Low",
    moderate: "⛅ Moderate",
    high: "☀️ High",
    veryHigh: "🌞 Very High"
} as const;

export function getAirPressureComment(airPressure: number) {
    if (airPressure < 980) {
        return airPressureComments.low;
    } else if (airPressure >= 980 && airPressure < 1000) {
        return airPressureComments.moderate;
    } else if (airPressure >= 1000 && airPressure < 1020) {
        return airPressureComments.high;
    } else {
        return airPressureComments.veryHigh;
    }
}