import {OneCallResponseSchema} from "~/lib/api/schemas";
import React from "react";
import {formatDate, formatISO, fromUnixTime} from "date-fns";

export interface CurrentWeatherProps {
    dataIsLoading: boolean;
    data?: OneCallResponseSchema;
}

export default function CurrentWeather({dataIsLoading, data}: CurrentWeatherProps) {

    if (dataIsLoading || !data) {
        return (<div className={"skeleton"}>
            <div></div>
            <div></div>
            <div></div>
        </div>);
    }

    return <div className={"weather-info"}>
        <img className={"icon"}
             src={`https://openweathermap.org/img/wn/${data.current.weather[0].icon}@4x.png`}
             alt={`${data.current.weather[0].description}`}/>

        <p className={"temperature"}>{~~data.current.temp}<sup>&deg;C</sup></p>

        <p className={"description"}>
            {data.current.weather[0].description}
            <span className={"temps"}>
                {~~data.daily[0].temp.max}<sup>&deg;C</sup> / {~~data.daily[0].temp.min}<sup>&deg;C</sup>
            </span>
        </p>

        <div className={"last-updated-at"}>
            <p>
                Last updated:
                <time dateTime={formatISO(fromUnixTime(data.current.dt))}>
                    {formatDate(fromUnixTime(data.current.dt), "do MMM, yyyy HH:mm")}
                </time>
            </p>
        </div>
    </div>;
}