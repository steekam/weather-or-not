import React, {useEffect} from 'react';
import {useGeolocation} from "./lib/hooks/use-geolocation";
import {getWeatherInfo} from "./lib/api";


function App() {
    const {loading, latitude, longitude} = useGeolocation({});

    useEffect(() => {
        if (loading || !(latitude && longitude)) {
            return;
        }

        getWeatherInfo({lon: longitude, lat: latitude})
            .then(res => {
                console.log(res);
            });

    }, [loading, latitude, longitude]);

    return (

        <div>
            <p>What is up my dude!</p>

            {loading ? "Waiting for location..." :
                <h2>Location: ${latitude} ${longitude}</h2>
            }
        </div>
    );
}

export default App;
