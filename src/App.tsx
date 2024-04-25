import React, {useContext} from 'react';
import {getWeatherInfo} from "./lib/api";
import {useQuery} from "@tanstack/react-query";
import {IntlProvider} from "react-intl";
import {AppContext} from "./lib/hooks/app-context";


function App() {
    // const {loading: waitingForLocation, latitude, longitude} = useGeolocation();
    const waitingForLocation = false;
    const latitude = -1.286389;
    const longitude = 36.817223;

    const {isLoading, data} = useQuery({
        queryKey: ["weather", {latitude, longitude}] as const,
        queryFn: async ({queryKey}) => {
            const {latitude, longitude} = queryKey[1];
            const res = await getWeatherInfo({lon: longitude!, lat: latitude!, exclude: ["daily", "alerts", "hourly"]});
            return res.data;
        },
        enabled: Boolean(!waitingForLocation && (latitude && longitude)),
    });

    const {locale, updateLocale} = useContext(AppContext);

    return (
        <IntlProvider defaultLocale={"en"} locale={locale}>
            <label htmlFor="language-switcher">Language</label>
            <select name="lang" id="language-switcher" onChange={(e) => updateLocale(e.target.value)}>
                <option value="en">English</option>
                <option value="sw">Swahili</option>
            </select>
            Current Locale: {locale}
            {
                (isLoading || waitingForLocation) ? "Loading..." : (<>
                    <h2>Your weather data: </h2>
                    <pre style={{padding: '10px', backgroundColor: "var(--gray-contrast)", color: "var(--gray-1)"}}>
                        {JSON.stringify(data.current, null, 2)}
                    </pre>
                </>)
            }
        </IntlProvider>
    );
}

export default App;
