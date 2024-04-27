import {useQuery} from "@tanstack/react-query";
import {getWeatherInfo} from "~/lib/api/index";

export interface OneCallQueryParams {
    latitude: number;
    longitude: number;
}

export function useOneCallQuery(params: OneCallQueryParams, queryOptions?: {enabled: boolean}) {
    return useQuery({
        queryKey: ["weather", params] as const,
        queryFn: ({queryKey}) => {
            const {latitude, longitude} = queryKey[1] as OneCallQueryParams;
            return getWeatherInfo({lon: longitude!, lat: latitude!, exclude: ["alerts", "hourly"]});
        },
        staleTime: 5 * 60 * 1000, // 5 minutes
        refetchOnWindowFocus: false,
        retry: false,
        ...queryOptions,
    });
}