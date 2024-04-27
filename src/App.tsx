import React, {useMemo} from 'react';
import {getWeatherInfo} from "./lib/api";
import {useQuery} from "@tanstack/react-query";
import {formatDate, formatISO, fromUnixTime} from "date-fns";
import {ScrollArea, ScrollBar} from "~/components/scroll-area";
import {degreesToCompassDirection} from "~/lib/utlis";


function App() {
    const waitingForLocation = false;
    const latitude = -1.286389;
    const longitude = 36.817223;

    const {isLoading, data} = useQuery({
        queryKey: ["weather", {latitude, longitude}] as const,
        queryFn: async ({queryKey}) => {
            const {latitude, longitude} = queryKey[1];
            const res = await getWeatherInfo({lon: longitude!, lat: latitude!, exclude: ["alerts", "hourly"]});
            return res.data;
        },
        enabled: Boolean(!waitingForLocation && (latitude && longitude)),
        staleTime: 30 * 60 * 1000,
        refetchOnWindowFocus: false,
    });

    if (data) {
        console.log(data);
    }

    const currentDerived = useMemo(() => {
        if (!data) {
            return null;
        }

        return {
            min: data.daily[0].temp.min,
            max: data.daily[0].temp.max,
            chanceOfRain: data.daily[0].pop * 100,
            summary: data.daily[0].summary,
        };
    }, [data]);

    const today = new Date();

    return (
        <main className={"wrapper"}>
            <div className={"container"}>
                <section className={"current-section"}>
                    <div>
                        <small>
                            <time dateTime={formatISO(today)} className={"current-weather-date"}>
                                {formatDate(today, "EEEE, do MMMM yyy")}
                            </time>
                        </small>
                        <h2 className={"location-title"}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                 strokeWidth={1.5}
                                 stroke="currentColor" className="location-icon">
                                <path strokeLinecap="round" strokeLinejoin="round"
                                      d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/>
                                <path strokeLinecap="round" strokeLinejoin="round"
                                      d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"/>
                            </svg>

                            <span>Nairobi, Kenya</span>
                        </h2>
                    </div>

                    {
                        isLoading ? (
                            <div className={"skeleton"}>
                                <div></div>
                                <div></div>
                                <div></div>
                            </div>) : (
                            <>
                                <div className={"weather-info"}>
                                    <img className={"icon"}
                                         src={`https://openweathermap.org/img/wn/${data.current.weather[0].icon}@4x.png`}
                                         alt={`${data.current.weather[0].description}`}/>

                                    <p className={"temperature"}>{~~data.current.temp}<sup>&deg;C</sup></p>

                                    <p className={"description"}>
                                        {data.current.weather[0].description}
                                        <span className={"temps"}>
                                            {~~currentDerived?.max}<sup>&deg;C</sup> / {~~currentDerived?.min}<sup>&deg;C</sup>
                                        </span>
                                    </p>
                                </div>
                                <div className={"last-updated-at"}>
                                    <p>
                                        Last updated:
                                        <time dateTime={formatISO(fromUnixTime(data.current.dt))}>
                                            {formatDate(fromUnixTime(data.current.dt), "do MMM, yyyy HH:mm")}
                                        </time>
                                    </p>
                                </div>
                            </>
                        )

                    }

                </section>

                <ScrollArea className={"detailed-section"}>
                    <ScrollBar orientation="horizontal" />
                    <div>
                        Language Switcher: English
                    </div>

                    <section className={"day-summary"}>
                        {isLoading
                            ? (<div className={"skeleton"}></div>)
                            : (
                                <>
                                    <h2>The Day&apos;s Vibe</h2>
                                    <p>{currentDerived?.summary}</p>
                                </>
                            )
                        }
                    </section>

                    <section className={"section week-forecast"}>
                        <h2 className={"title"}>7 day forecast</h2>

                        {
                            isLoading ?
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
                                                // @ts-expect-error
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
                                        <ScrollBar orientation="horizontal" />
                                    </ScrollArea>
                                )
                        }
                    </section>

                    <section className="section highlights">
                        <h2 className={"title"}>Highlight Reel</h2>

                        {
                            isLoading ?
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
                                                You can get out your glasses
                                            </p>
                                        </div>

                                        <div className="card wind-status">
                                            <p className={"card-title"}>Wind Status</p>
                                            <div className="card-content">
                                                <span className={"metric-value"}>{data.current.wind_speed}</span> <small className={"metric-unit"}>metre/sec</small>
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
                                                It's okay outside
                                            </p>
                                        </div>

                                        <div className="card">
                                            <p className={"card-title"}>Visibility</p>
                                            <div className={"card-content"}>
                                                <span className={"metric-value"}>{data.current.visibility / 1000}</span> <small
                                                className={"metric-unit"}>km</small>
                                            </div>
                                            <p className={"comment"}>
                                                Great
                                            </p>
                                        </div>

                                        <div className="card">
                                            <p className={"card-title"}>Pressure</p>
                                            <div className={"card-content"}>
                                                <span className={"metric-value"}>{data.current.pressure}</span> <small
                                                className={"metric-unit"}>hPa</small>
                                            </div>
                                            <p className={"comment"}>
                                                Average
                                            </p>
                                        </div>
                                    </div>
                                )
                        }

                    </section>
                </ScrollArea>
            </div>
        </main>
    );
}

export default App;
