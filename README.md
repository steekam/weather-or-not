# Weather or Not

## Description
Weather or Not is a simple web app that displays weather data for a specific location using the OpenWeatherMap API. 
It provides users with current weather conditions, temperature, humidity, wind speed, and more.

## Requirements
- Node.js >= 18

## Installation Instructions
1. Clone the repository: `git clone https://github.com/steekam/weather-or-not.git`
2. Navigate to the project directory: `cd weather-or-not`
3. Install dependencies: `npm install`

## Running Locally
To run the project locally:
1. Start the development server: `npm start`
2. Open your web browser and navigate to `http://localhost:3000`

## Running test
1. Setup `.env.test.local` file with `REACT_APP_OPEN_WEATHER_MAP_KEY` API key value
2. Run `npm run test`

## Tools Used
- [Create React App](https://create-react-app.dev/): A popular tool for bootstrapping React applications, used for scaffolding the project.
- [OpenWeatherMap API](https://openweathermap.org/): Provides weather data used in the application.
- [Lightning CSS](https://lightningcss.dev/) Tool: Used for minification and optimization of CSS files.
- [TanStack query](https://tanstack.com/query/latest/docs/framework/react/overview) - Data fetching library with caching capabilities
- [Radix UI Colors](https://www.radix-ui.com/colors) : Generate the app's color scheme.
- [Radix UI Primitives](https://www.radix-ui.com/primitives/docs/overview/introduction) : Accessible primitives for interactive components
- [Design inspiration](https://dribbble.com/shots/20449736-Weather-App)

## Comments on some decisions rationale

- The AppContextProvider used is purely for demonstration value based on task requirements. The ii8n library used provides it's own context to switch locales.
- I am using tanstack-query to fetch and cache and API data instead of storing it in the context. The library does a lot of the heavy lifting of status updates and caching.
- Using lightning css tool as a minifier allows me to write modern CSS but ensure browser compatibility. I didn't need to install scss.


## Probable improvements

> I made tradeoffs based on time constraint

- The app has dark/light mode support but it is not user configurable
- Add visual charts for hourly weather results
- Allow adding favourite cities from user. Values can be saved in local storage.

## Contributors
- [Kamau Wanyee](https://github.com/steekam)

