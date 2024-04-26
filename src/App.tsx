import React, {useMemo} from 'react';
import {getWeatherInfo} from "./lib/api";
import {useQuery} from "@tanstack/react-query";
import {formatDate, formatISO, fromUnixTime} from "date-fns";


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
        staleTime: 10 * 60 * 1000,
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
        };
    }, [data]);

    const today = new Date;

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
                                        {data.current.weather[0].main}
                                        <span className={"temps"}>
                                            {~~currentDerived?.min}<sup>&deg;C</sup> / {~~currentDerived?.max}<sup>&deg;C</sup>
                                        </span>
                                    </p>

                                </div>
                                <p className={"last-updated-at"}>
                                    Last updated:
                                    <time dateTime={formatISO(fromUnixTime(data.current.dt))}>
                                        {formatDate(fromUnixTime(data.current.dt), "do MMM, yyyy HH:mm")}
                                    </time>
                                </p>
                            </>
                        )

                    }

                </section>

                <section className={"detailed-section"}>
                    Extra information
                </section>
            </div>
        </main>
    );
}

export default App;
