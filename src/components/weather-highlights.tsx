import {
    degreesToCompassDirection,
    getAirPressureComment,
    getHumidityComment,
    getVisibilityComment,
    uviValueComment
} from "~/lib/utlis";
import {formatDate, fromUnixTime} from "date-fns";
import React from "react";
import {OneCallResponseSchema} from "~/lib/api/schemas";

export interface WeatherHighlightsProps {
    isDataLoading: boolean;
    data ?: OneCallResponseSchema;
}

export default function WeatherHighlights({isDataLoading, data}: WeatherHighlightsProps) {
    return <section className="section highlights">
        <h2 className={"title"}>Highlight Reel</h2>

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
                            <p className={"card-title"}>UV Index</p>
                            <div className={"card-content fs-xl"}>
                                {data.current.uvi}
                            </div>
                            <p className={"comment"}>
                                {uviValueComment(data.current.uvi)}
                            </p>
                        </div>

                        <div className="card wind-status">
                            <p className={"card-title"}>Wind Status</p>
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
                            <p className={"card-title"}>Sunrise & Sunset</p>
                            <div className={"card-content"}>
                                <div>
                                    <span>🌅</span>
                                    <span>{formatDate(fromUnixTime(data.current.sunrise), "hh:mm a")}</span>
                                </div>
                                <div>
                                    <span>🌇</span>
                                    <span>{formatDate(fromUnixTime(data.current.sunset), "hh:mm a")}</span>
                                </div>
                            </div>
                        </div>

                        <div className="card">
                            <p className={"card-title"}>Humidity</p>
                            <div className={"card-content"}>
                                <span className={"metric-value"}>{data.current.humidity}%</span>
                            </div>
                            <p className={"comment"}>
                                {getHumidityComment(data.current.humidity)}
                            </p>
                        </div>

                        <div className="card">
                            <p className={"card-title"}>Visibility</p>
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
                            <p className={"card-title"}>Pressure</p>
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
