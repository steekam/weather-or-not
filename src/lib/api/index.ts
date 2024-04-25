import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "https://api.openweathermap.org/data/3.0/onecall",
    headers: {
        Accept: "application/json",
    }
});

axiosInstance.interceptors.request.use(function (config) {
    const url = new URL(config.baseURL!+`${config.url!}`);
    url.searchParams.append("appid", process.env.REACT_APP_OPEN_WEATHER_MAP_KEY);
    config.url = url.toString();

    return config;
});

export const WeatherDataOptions = ["current", "minutely", "hourly", "daily", "alerts"] as const;
export type WeatherDataOption = (typeof WeatherDataOptions)[number];

export interface GetWeatherInfoOptions {
    lat: number;
    lon: number;
    exclude?: WeatherDataOption[];
    lang?: string;
}

export async function getWeatherInfo(options: GetWeatherInfoOptions) {
    if (options.exclude) {
        if (options.exclude.length > 1) {
            // @ts-expect-error Transforming data to string for API call
            options.exclude = options.exclude.join(",");
        } else {
            delete options.exclude;
        }
    }

    // @ts-expect-error Number types will be coerced to string
    const params = new URLSearchParams(options);
    params.append("units", "metric");
    return axiosInstance.get(`?${params.toString()}`);
}
