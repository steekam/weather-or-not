import {OneCallResponseSchema} from "~/lib/api/schemas";
import React, {useContext} from "react";
import {useTranslation} from "react-i18next";
import {format} from "@formkit/tempo";
import {dateFromUnixTime} from "~/lib/utils";
import {AppContext} from "~/lib/hooks/app-context";

export interface CurrentWeatherProps {
    dataIsLoading: boolean;
    data?: OneCallResponseSchema;
}

export default function CurrentWeather({dataIsLoading, data}: CurrentWeatherProps) {
    const {t} = useTranslation();
    const {locale} = useContext(AppContext);

    if (dataIsLoading || !data) {
        return (<div className={"skeleton"}>
            <div></div>
            <div></div>
            <div></div>
        </div>);
    }

    const currentDate = dateFromUnixTime(data?.current.dt);

    return <div className={"weather-info"}>
        <img className={"icon"}
             src={`https://openweathermap.org/img/wn/${data.current.weather[0].icon}@4x.png`}
             alt={`${data.current.weather[0].description}`}/>

        <p className={"temperature"}>{~~data.current.temp}<sup>&deg;C</sup></p>

        <p className={"description"}>
            {t(data.current.weather[0].description)}
            <span className={"temps"}>
                {~~data.daily[0].temp.max}<sup>&deg;C</sup> / {~~data.daily[0].temp.min}<sup>&deg;C</sup>
            </span>
        </p>

        <div className={"last-updated-at"}>
            <p>
                {t('Last updated')}:
                <time dateTime={currentDate.toISOString()}>
                    {format(currentDate, "DD MMM, YYYY HH:mm", locale)}
                </time>
            </p>
        </div>
    </div>;
}