import React from 'react';
import {renderHook, screen, waitFor} from '@testing-library/react';
import App from '../App';
import {createWrapper, renderWithClient} from "~/tests/utils";
import {useOneCallQuery} from "~/lib/api/queries";
import axios from "axios";

const sampleResponse = {
        "lat": -1.2864,
        "lon": 36.8172,
        "timezone": "Africa/Nairobi",
        "timezone_offset": 10800,
        "current": {
            "dt": 1714218971,
            "sunrise": 1714188483,
            "sunset": 1714231940,
            "temp": 25.85,
            "feels_like": 25.93,
            "pressure": 1019,
            "humidity": 55,
            "dew_point": 16.13,
            "uvi": 7.95,
            "clouds": 75,
            "visibility": 10000,
            "wind_speed": 4.63,
            "wind_deg": 210,
            "weather": [
                {
                    "id": 500,
                    "main": "Rain",
                    "description": "light rain",
                    "icon": "10d"
                }
            ],
            "rain": {
                "1h": 0.32
            }
        },
        "daily": [
            {
                "dt": 1714208400,
                "sunrise": 1714188483,
                "sunset": 1714231940,
                "moonrise": 1714242540,
                "moonset": 1714197900,
                "moon_phase": 0.61,
                "summary": "You can expect partly cloudy in the morning, with rain in the afternoon",
                "temp": {
                    "day": 24.63,
                    "min": 16.29,
                    "max": 25.85,
                    "night": 17.21,
                    "eve": 22.75,
                    "morn": 16.31
                },
                "feels_like": {
                    "day": 24.69,
                    "night": 17.49,
                    "eve": 22.96,
                    "morn": 16.48
                },
                "pressure": 1015,
                "humidity": 59,
                "dew_point": 16.09,
                "wind_speed": 2.84,
                "wind_deg": 30,
                "wind_gust": 5.64,
                "weather": [
                    {
                        "id": 501,
                        "main": "Rain",
                        "description": "moderate rain",
                        "icon": "10d"
                    }
                ],
                "clouds": 77,
                "pop": 1,
                "rain": 8.97,
                "uvi": 13.92
            },
            {
                "dt": 1714294800,
                "sunrise": 1714274876,
                "sunset": 1714318331,
                "moonrise": 1714332360,
                "moonset": 1714287660,
                "moon_phase": 0.64,
                "summary": "There will be rain today",
                "temp": {
                    "day": 22.39,
                    "min": 16.71,
                    "max": 22.61,
                    "night": 17.33,
                    "eve": 19.72,
                    "morn": 16.79
                },
                "feels_like": {
                    "day": 22.59,
                    "night": 17.65,
                    "eve": 20.02,
                    "morn": 17.01
                },
                "pressure": 1014,
                "humidity": 73,
                "dew_point": 17.18,
                "wind_speed": 2.72,
                "wind_deg": 206,
                "wind_gust": 3.51,
                "weather": [
                    {
                        "id": 501,
                        "main": "Rain",
                        "description": "moderate rain",
                        "icon": "10d"
                    }
                ],
                "clouds": 64,
                "pop": 1,
                "rain": 26.03,
                "uvi": 13.98
            },
            {
                "dt": 1714381200,
                "sunrise": 1714361270,
                "sunset": 1714404722,
                "moonrise": 1714422240,
                "moonset": 1714377540,
                "moon_phase": 0.68,
                "summary": "Expect a day of partly cloudy with rain",
                "temp": {
                    "day": 22.71,
                    "min": 16.56,
                    "max": 23.09,
                    "night": 17.43,
                    "eve": 19.71,
                    "morn": 16.56
                },
                "feels_like": {
                    "day": 22.89,
                    "night": 17.76,
                    "eve": 20.01,
                    "morn": 16.8
                },
                "pressure": 1014,
                "humidity": 71,
                "dew_point": 16.96,
                "wind_speed": 1.62,
                "wind_deg": 233,
                "wind_gust": 2.46,
                "weather": [
                    {
                        "id": 501,
                        "main": "Rain",
                        "description": "moderate rain",
                        "icon": "10d"
                    }
                ],
                "clouds": 97,
                "pop": 1,
                "rain": 34.11,
                "uvi": 13.7
            },
            {
                "dt": 1714467600,
                "sunrise": 1714447665,
                "sunset": 1714491113,
                "moonrise": 0,
                "moonset": 1714467420,
                "moon_phase": 0.71,
                "summary": "Expect a day of partly cloudy with rain",
                "temp": {
                    "day": 24.01,
                    "min": 17.04,
                    "max": 24.01,
                    "night": 17.77,
                    "eve": 19,
                    "morn": 17.08
                },
                "feels_like": {
                    "day": 24.14,
                    "night": 18.08,
                    "eve": 19.33,
                    "morn": 17.35
                },
                "pressure": 1012,
                "humidity": 64,
                "dew_point": 16.39,
                "wind_speed": 3.28,
                "wind_deg": 67,
                "wind_gust": 5.76,
                "weather": [
                    {
                        "id": 502,
                        "main": "Rain",
                        "description": "heavy intensity rain",
                        "icon": "10d"
                    }
                ],
                "clouds": 100,
                "pop": 1,
                "rain": 34.28,
                "uvi": 13.64
            },
            {
                "dt": 1714554000,
                "sunrise": 1714534060,
                "sunset": 1714577505,
                "moonrise": 1714512060,
                "moonset": 1714557180,
                "moon_phase": 0.75,
                "summary": "There will be rain today",
                "temp": {
                    "day": 19.83,
                    "min": 16.96,
                    "max": 22.38,
                    "night": 17.62,
                    "eve": 20.36,
                    "morn": 17.11
                },
                "feels_like": {
                    "day": 20.04,
                    "night": 17.79,
                    "eve": 20.7,
                    "morn": 17.3
                },
                "pressure": 1013,
                "humidity": 83,
                "dew_point": 16.67,
                "wind_speed": 3.09,
                "wind_deg": 235,
                "wind_gust": 4.28,
                "weather": [
                    {
                        "id": 501,
                        "main": "Rain",
                        "description": "moderate rain",
                        "icon": "10d"
                    }
                ],
                "clouds": 98,
                "pop": 1,
                "rain": 13.97,
                "uvi": 12.91
            },
            {
                "dt": 1714640400,
                "sunrise": 1714620455,
                "sunset": 1714663898,
                "moonrise": 1714601820,
                "moonset": 1714646760,
                "moon_phase": 0.78,
                "summary": "There will be rain today",
                "temp": {
                    "day": 18.7,
                    "min": 16.84,
                    "max": 21.82,
                    "night": 18.11,
                    "eve": 19.16,
                    "morn": 16.84
                },
                "feels_like": {
                    "day": 18.82,
                    "night": 18.22,
                    "eve": 19.32,
                    "morn": 17.03
                },
                "pressure": 1013,
                "humidity": 84,
                "dew_point": 15.6,
                "wind_speed": 3.23,
                "wind_deg": 246,
                "wind_gust": 5.83,
                "weather": [
                    {
                        "id": 500,
                        "main": "Rain",
                        "description": "light rain",
                        "icon": "10d"
                    }
                ],
                "clouds": 100,
                "pop": 0.92,
                "rain": 3,
                "uvi": 13
            },
            {
                "dt": 1714726800,
                "sunrise": 1714706851,
                "sunset": 1714750291,
                "moonrise": 1714691400,
                "moonset": 1714736160,
                "moon_phase": 0.82,
                "summary": "There will be rain today",
                "temp": {
                    "day": 19.86,
                    "min": 16.42,
                    "max": 20.91,
                    "night": 17.97,
                    "eve": 19.17,
                    "morn": 16.42
                },
                "feels_like": {
                    "day": 19.99,
                    "night": 18.15,
                    "eve": 19.41,
                    "morn": 16.57
                },
                "pressure": 1014,
                "humidity": 80,
                "dew_point": 15.96,
                "wind_speed": 3.64,
                "wind_deg": 255,
                "wind_gust": 6.77,
                "weather": [
                    {
                        "id": 501,
                        "main": "Rain",
                        "description": "moderate rain",
                        "icon": "10d"
                    }
                ],
                "clouds": 100,
                "pop": 1,
                "rain": 13.98,
                "uvi": 13
            },
            {
                "dt": 1714813200,
                "sunrise": 1714793248,
                "sunset": 1714836685,
                "moonrise": 1714780860,
                "moonset": 1714825560,
                "moon_phase": 0.86,
                "summary": "There will be rain today",
                "temp": {
                    "day": 20.86,
                    "min": 16.8,
                    "max": 22.98,
                    "night": 18.14,
                    "eve": 19.4,
                    "morn": 16.8
                },
                "feels_like": {
                    "day": 21.01,
                    "night": 18.39,
                    "eve": 19.69,
                    "morn": 16.99
                },
                "pressure": 1016,
                "humidity": 77,
                "dew_point": 16.24,
                "wind_speed": 2.88,
                "wind_deg": 219,
                "wind_gust": 3.71,
                "weather": [
                    {
                        "id": 501,
                        "main": "Rain",
                        "description": "moderate rain",
                        "icon": "10d"
                    }
                ],
                "clouds": 99,
                "pop": 0.91,
                "rain": 8.41,
                "uvi": 13
            }
        ]
    };

jest.mock('axios', () => {

    // @ts-ignore
    const axiosMock = {
        create: jest.fn(() => axiosMock),
        interceptors: {
            request: {
                use: jest.fn(),
                eject: jest.fn(),
            },
            response: {
                use: jest.fn(),
                eject: jest.fn(),
            },
        },
    }

    return axiosMock;
});

test('initial app is rendered with skeleton loader', () => {
    renderWithClient(<App/>);
    const element = screen.getByTestId("day-summary-skeleton");
    expect(element).toBeInTheDocument();
});

test('successful API weather one call query hook', async () => {
    // Default Nairobi geo codes
    const latitude = -1.286389;
    const longitude = 36.817223;

    const { result } = renderHook(() => useOneCallQuery({latitude, longitude}), {
        wrapper: createWrapper()
    })


    await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
    })

    expect(result.current.data?.timezone).toBe('Africa/Nairobi')
})
