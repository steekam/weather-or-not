import React, {useContext} from 'react';
import {formatDate, formatISO} from "date-fns";
import {ScrollArea, ScrollBar} from "~/components/scroll-area";
import {AppContext} from "~/lib/hooks/app-context";
import {useOneCallQuery} from "~/lib/api/queries";
import CurrentWeather from "~/components/current-weather";
import WeekForecast from "~/components/week-forecast";
import WeatherHighlights from "~/components/weather-highlights";
import {Trans, useTranslation} from "react-i18next";


function App() {
    const {t} = useTranslation();

    const {locale, updateLocale} = useContext(AppContext);

    // Default Nairobi geo codes
    const latitude = -1.286389;
    const longitude = 36.817223;

    const {data, isLoading, error} = useOneCallQuery({latitude, longitude});

    if (error) {
        console.error(error);
    }

    const today = new Date();

    return (
        <main className={"wrapper"}>
            {
                error && (
                    <div className="error-alert">
                        <h2 className={"heading"}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                                 stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round"
                                      d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"/>
                            </svg>

                            {t('error.title', {defaultValue: "Something went wrong 😕"})}

                        </h2>
                        <p> {t('error.generic', {
                            defaultValue: "We cannot handle your request right now. There seems to be an issue with our service. Check in again later."
                        })}
                        </p>
                    </div>
                )
            }

            <div className={"container"}>
                <section className={"current-section"}>
                    <div>
                        <div style={{position: "relative"}}>
                            <label className="sr-only" htmlFor="language-swithcer">{t("Switch Language")}</label>
                            <select id="language-switcher" value={locale} onChange={e => updateLocale(e.target.value)}>
                                <option value="en">English</option>
                                <option value="sw">Swahili</option>
                            </select>
                        </div>
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

                    <CurrentWeather dataIsLoading={isLoading} data={data}/>
                </section>

                <ScrollArea className={"detailed-section"}>
                    <ScrollBar orientation="horizontal"/>

                    <section className={"day-summary"}>
                        {(isLoading || !data)
                            ? (<div className={"skeleton"}></div>)
                            : (
                                <>
                                    <h2>{t('day-summary.title')}</h2>
                                    <p>{data.daily[0].summary}</p>
                                </>
                            )
                        }
                    </section>

                    <WeekForecast isDataLoading={isLoading} data={data}/>

                    <WeatherHighlights isDataLoading={isLoading} data={data}/>
                </ScrollArea>
            </div>
        </main>
    );
}

export default App;
