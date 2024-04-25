import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "https://api.openweathermap.org",
    headers: {
        Accept: "application/json",
    }
});

axiosInstance.interceptors.request.use(function (config) {
    const url = new URL(config.baseURL! + `${config.url!}`);
    url.searchParams.append("appid", process.env.REACT_APP_OPEN_WEATHER_MAP_KEY);
    config.url = url.toString();

    return config;
});

export {axiosInstance};