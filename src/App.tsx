import React from 'react';
import {useGeolocation} from "./lib/hooks/use-geolocation";
import {getWeatherInfo} from "./lib/api";
import {useQuery} from "@tanstack/react-query";


function App() {
    const {loading: waitingForLocation, latitude, longitude} = useGeolocation();

    const {isLoading, data} = useQuery({
        queryKey: ["weather", {latitude, longitude}] as const,
        queryFn: ({queryKey}) => {
            const {latitude, longitude} = queryKey[1];
            return getWeatherInfo({lon: longitude!, lat: latitude!});
        },
        enabled: Boolean(!waitingForLocation && (latitude && longitude)),
    });

    return (

        <div>
            <p>What is up my dude!</p>
            {
                (isLoading || waitingForLocation) ? "Loading..." : (<>
                    <h2>Your weather data: </h2>
                    <pre style={{padding: '10px', backgroundColor: "var(--gray-contrast)", color: "var(--gray-1)"}}>
                        {JSON.stringify(data, null, 2)}
                    </pre>
                </>)
            }

        </div>
    );
}

export default App;
