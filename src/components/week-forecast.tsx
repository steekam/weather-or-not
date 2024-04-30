import {OneCallResponseSchema} from "~/lib/api/schemas";
import React, {useContext} from "react";
import {ScrollArea, ScrollBar} from "~/components/scroll-area";
import {useTranslation} from "react-i18next";
import {AppContext} from "~/lib/hooks/app-context";
import {format} from "@formkit/tempo";
import {dateFromUnixTime} from "~/lib/utils";

export interface WeekForecastProps {
    isDataLoading: boolean;
    data?: OneCallResponseSchema;
}

export default function WeekForecast({isDataLoading, data }: WeekForecastProps) {
    const {t} = useTranslation();
    const {locale} = useContext(AppContext);

    return <section className={"section week-forecast"}>
        <h2 className={"title"}>{t('week-forecast.title')}</h2>

        {
            (isDataLoading || !data) ?
                (<div className={"skeleton"}>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>)
                : (
                    <ScrollArea className="days-container-root">
                        <ul className={"days-container"}>
                            {
                                data.daily.slice(1).map((day) => {
                                    const currentDayDate = dateFromUnixTime(day.dt);
                                    return (
                                        <li className={"day-card"} key={day.dt}>
                                            <time dateTime={currentDayDate.toISOString()}
                                                  className={"day"}>{format({date: currentDayDate, format: "ddd", locale})}</time>
                                            <div>
                                                <img
                                                    src={`https://openweathermap.org/img/wn/${day.weather[0].icon}.png`}
                                                    alt={`Weather icon for ${day.weather[0].icon}`}/>
                                            </div>
                                            <p className={"weather"}>{t(day.weather[0].main)}</p>
                                            <p className={"temps"}>
                                                {~~day.temp.max}<sup>&deg;</sup>{" "}/{" "}
                                                <span
                                                    className={"min"}>{~~day.temp.min}<sup>&deg;</sup></span>
                                            </p>
                                        </li>
                                    );
                                })
                            }
                        </ul>
                        <ScrollBar orientation="horizontal"/>
                    </ScrollArea>
                )
        }
    </section>
};