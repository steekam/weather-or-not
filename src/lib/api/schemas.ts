export interface WeatherApiError {
    cod: number;
    message: string;
    parameters?: Array<string>;
}

export interface WeatherSchema {
    "id": number,
    "main": string,
    "description": string,
    "icon": string
}

export interface CurrentWeatherSchema {
    "dt": number,
    "sunrise": number,
    "sunset": number,
    "temp": number,
    "feels_like": number,
    "pressure": number,
    "humidity": number,
    "dew_point": number,
    "uvi": number,
    "clouds": number,
    "visibility": number,
    "wind_speed": number,
    "wind_deg": number,
    "wind_gust": number,
    "weather": WeatherSchema[]
}

export interface DailyWeatherSchema {
    "dt": number,
    "sunrise": number,
    "sunset": number,
    "moonrise": number,
    "moonset": number,
    "moon_phase": number,
    "summary": string,
    "temp": {
        "day": number,
        "min": number,
        "max": number,
        "night": number,
        "eve": number,
        "morn": number
    },
    "feels_like": {
        "day": number,
        "night": number,
        "eve": number,
        "morn": number
    },
    "pressure": number,
    "humidity": number,
    "dew_point": number,
    "wind_speed": number,
    "wind_deg": number,
    "wind_gust": number,
    "weather": WeatherSchema[],
    "clouds": number,
    "pop": number,
    "rain": number,
    "uvi": number
}

export interface OneCallResponseSchema {
    lat: number,
    long: number,
    timezone: string,
    timezone_offset: number,
    current: CurrentWeatherSchema,
    daily: DailyWeatherSchema[],
}
