import {
    dateFromUnixTime,
    degreesToCompassDirection,
    getAirPressureComment,
    getHumidityComment,
    getVisibilityComment,
    uviValueComment
} from "~/lib/utils";
import React, {useContext} from "react";
import {OneCallResponseSchema} from "~/lib/api/schemas";
import {useTranslation} from "react-i18next";
import {format} from "@formkit/tempo";
import {AppContext} from "~/lib/hooks/app-context";

export interface WeatherHighlightsProps {
    isDataLoading: boolean;
    data ?: OneCallResponseSchema;
}

export default function WeatherHighlights({isDataLoading, data}: WeatherHighlightsProps) {
    const {t} = useTranslation();
    const {locale} = useContext(AppContext);

    return <section className="section highlights">
        <h2 className={"title"}>{t('highlights.title')}</h2>

        {
            (isDataLoading || !data) ?
                (<div className="skeleton">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>)
                : (
                    <div className={"highlights-container"}>
                        <div className="card">
                            <p className={"card-title"}>{t('highlights.card-title.uv', {defaultValue: "UV Index"})}</p>
                            <div className={"card-content fs-xl"}>
                                {data.current.uvi}
                            </div>
                            <p className={"comment"}>
                                {uviValueComment(data.current.uvi)}
                            </p>
                        </div>

                        <div className="card wind-status">
                            <p className={"card-title"}>{t('highlights.card-title.wind', {defaultValue: "Wind Status"})}</p>
                            <div className="card-content">
                                <span className={"metric-value"}>{data.current.wind_speed}</span> <small
                                className={"metric-unit"}>metre/sec</small>
                            </div>
                            <div className={"comment"}>
                                <div className={"compass-icon"}>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                                         fill="currentColor" className="w-6 h-6">
                                        <path fillRule="evenodd"
                                              d="m11.54 22.351.07.04.028.016a.76.76 0 0 0 .723 0l.028-.015.071-.041a16.975 16.975 0 0 0 1.144-.742 19.58 19.58 0 0 0 2.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 0 0-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 0 0 2.682 2.282 16.975 16.975 0 0 0 1.145.742ZM12 13.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
                                              clipRule="evenodd"/>
                                    </svg>
                                </div>

                                {degreesToCompassDirection(data.current.wind_deg)}
                            </div>
                        </div>

                        <div className="card sunrise-sunset">
                            <p className={"card-title"}>{t('highlights.card-title.sunrise', {defaultValue: "Sunrise & Sunset"})}</p>
                            <div className={"card-content"}>
                                <div>
                                    <span>🌅</span>
                                    <time dateTime={dateFromUnixTime(data.current.sunrise).toISOString()}>{format(dateFromUnixTime(data.current.sunrise), "hh:mm A", locale)}</time>
                                </div>
                                <div>
                                    <span>🌇</span>
                                    <time dateTime={dateFromUnixTime(data.current.sunset).toISOString()}>{format(dateFromUnixTime(data.current.sunset), "hh:mm A", locale)}</time>
                                </div>
                            </div>
                        </div>

                        <div className="card">
                            <p className={"card-title"}>{t('highlights.card-title.humidity', {defaultValue: "Humidity"})}</p>
                            <div className={"card-content"}>
                                <span className={"metric-value"}>{data.current.humidity}%</span>
                            </div>
                            <p className={"comment"}>
                                {getHumidityComment(data.current.humidity)}
                            </p>
                        </div>

                        <div className="card">
                            <p className={"card-title"}>{t('highlights.card-title.visibility', {defaultValue: "Visibility"})}</p>
                            <div className={"card-content"}>
                                <span className={"metric-value"}>{data.current.visibility / 1000}</span>
                                <small
                                    className={"metric-unit"}>km</small>
                            </div>
                            <p className={"comment"}>
                                {getVisibilityComment(data.current.visibility)}
                            </p>
                        </div>

                        <div className="card">
                            <p className={"card-title"}>{t('highlights.card-title.pressure', {defaultValue: "Air Pressure"})}</p>
                            <div className={"card-content"}>
                                <span className={"metric-value"}>{data.current.pressure}</span> <small
                                className={"metric-unit"}>hPa</small>
                            </div>
                            <p className={"comment"}>
                                {getAirPressureComment(data.current.pressure)}
                            </p>
                        </div>
                    </div>
                )
        }

    </section>
}
