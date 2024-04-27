import {axiosInstance} from "./base";
import {OneCallResponseSchema} from "~/lib/api/schemas";

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
    return axiosInstance.get<OneCallResponseSchema>(`/data/3.0/onecall?${params.toString()}`)
        .then(res => res.data);
}

export async function geocodeSearchByLocationName(query: string, limit: number = 2) {
    const params = new URLSearchParams({
        q: query,
        limit: limit.toString(),
    });
    return axiosInstance.get(`/geo/1.0/direct?${params.toString()}`)
        .then(res => res.data);
}


export async function reverseGeoCodeSearch({lat, long}: { lat: number, long: number }, limit: number = 1) {
    const params = new URLSearchParams({
        lat: lat.toString(),
        long: long.toString(),
        limit: limit.toString(),
    });
    return axiosInstance.get(`/geo/1.0/reverser?${params.toString()}`)
        .then(res => res.data);
}