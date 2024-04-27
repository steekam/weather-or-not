import {OneCallResponseSchema} from "~/lib/api/schemas";
import React from "react";
import {ScrollArea, ScrollBar} from "~/components/scroll-area";
import {formatDate, formatISO, fromUnixTime} from "date-fns";

export interface WeekForecastProps {
    isDataLoading: boolean;
    data?: OneCallResponseSchema;
}

export default function WeekForecast({isDataLoading, data }: WeekForecastProps) {

    return <section className={"section week-forecast"}>
        <h2 className={"title"}>7 day forecast</h2>

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
                                    const currentDayDate = fromUnixTime(day.dt);
                                    return (
                                        <li className={"day-card"} key={day.dt}>
                                            <time dateTime={formatISO(currentDayDate)}
                                                  className={"day"}>{formatDate(currentDayDate, "iii")}</time>
                                            <div>
                                                <img
                                                    src={`https://openweathermap.org/img/wn/${day.weather[0].icon}.png`}
                                                    alt={`Weather icon for ${day.weather[0].icon}`}/>
                                            </div>
                                            <p className={"weather"}>{day.weather[0].main}</p>
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