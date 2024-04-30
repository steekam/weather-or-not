import i18n from "i18next";

export function degreesToCompassDirection(degrees: number) {
    const directions = ['North', 'NNE', 'NE', 'ENE', 'East', 'ESE', 'SE', 'SSE', 'South', 'SSW', 'SW', 'WSW', 'West', 'WNW', 'NW', 'NNW'] as const;
    const index = Math.round((degrees / 22.5) % 16);
    return i18n.t(`compass.${directions[(index + 16) % 16]}`);
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
        return i18n.t("highlights.comments.uvi.veryLow", {defaultValue: uviComments.veryLow});
    } else if (value >= 3 && value <= 5) {
        return i18n.t("highlights.comments.uvi.low", {defaultValue: uviComments.low});
    } else if (value >= 6 && value <= 14) {
        return i18n.t("highlights.comments.uvi.hot", {defaultValue: uviComments.hot});
    } else if (value >= 15 && value <= 18) {
        return i18n.t("highlights.comments.uvi.veryHot", {defaultValue: uviComments.veryHot});
    } else {
        return i18n.t("highlights.comments.uvi.extreme", {defaultValue: uviComments.extreme});
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
        return i18n.t("highlights.comments.humidity.low", {defaultValue: humidityComments.low});
    } else if (humidityLevel >= 30 && humidityLevel < 50) {
        return i18n.t("highlights.comments.humidity.medium", {defaultValue: humidityComments.medium});
    } else if (humidityLevel >= 50 && humidityLevel < 70) {
        return i18n.t("highlights.comments.humidity.average", {defaultValue: humidityComments.average});
    } else {
        return i18n.t("highlights.comments.humidity.wet", {defaultValue: humidityComments.wet});
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
        return i18n.t("highlights.comments.visibility.low", {defaultValue: visibilityComments.low});
    } else if (visibility >= 2 && visibility < 5) {
        return i18n.t("highlights.comments.visibility.medium", {defaultValue: visibilityComments.medium});
    } else if (visibility >= 5 && visibility < 8) {
        return i18n.t("highlights.comments.visibility.average", {defaultValue: visibilityComments.average});
    } else {
        return i18n.t("highlights.comments.visibility.great", {defaultValue: visibilityComments.great});
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
        return i18n.t("highlights.comments.pressure.low", {defaultValue: airPressureComments.low});
    } else if (airPressure >= 980 && airPressure < 1000) {
        return i18n.t("highlights.comments.pressure.moderate", {defaultValue: airPressureComments.moderate});
    } else if (airPressure >= 1000 && airPressure < 1020) {
        return i18n.t("highlights.comments.pressure.high", {defaultValue: airPressureComments.high});
    } else {
        return i18n.t("highlights.comments.pressure.veryHigh", {defaultValue: airPressureComments.veryHigh});
    }
}

export function dateFromUnixTime(timestamp: number) {
    return new Date(timestamp * 1000);
}