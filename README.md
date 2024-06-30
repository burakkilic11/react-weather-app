# Weather App

This is a simple weather application built with React that fetches and displays weather information for a specified location using the OpenWeatherMap API. 

## Features

- Search for a city to get the current weather information.
- Displays the temperature in Celsius.
- Shows additional weather details such as feels like temperature, humidity, and wind speed in KPH.
- Displays the city name along with the country code.

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/your-username/weather-app.git
   cd weather-app
   ```

2. Install the dependencies:
   ```sh
   npm install
   ```

3. Obtain an API key from [OpenWeatherMap](https://openweathermap.org/api) and replace the `API_KEY` constant in the code with your API key:
   ```js
   // Your OpenWeatherMap API key
   const API_KEY = 'your-api-key-here';
   ```

4. Start the application:
   ```sh
   npm start
   ```

## Usage

- Enter a city name in the search box and press Enter.
- The app will display the current weather information for the specified city, including temperature in Celsius, weather description, feels like temperature, humidity, and wind speed in KPH.

## Code Overview

The main logic of the application is as follows:

- The `getCoordinates` function fetches the geographical coordinates (latitude and longitude) of the specified location using the OpenWeatherMap geocoding API.
- The `getWeatherData` function fetches the weather data using the coordinates obtained from the `getCoordinates` function.
- The `searchLocation` function handles the search event, calls `getCoordinates` to get the coordinates of the entered location, and then calls `getWeatherData` to fetch and display the weather data.
- The `toCelsius` function converts Fahrenheit to Celsius.
- The `toKPH` function converts MPH to KPH.

## Notes

- Ensure you have replaced the placeholder `API_KEY` in the code with your actual API key from OpenWeatherMap.
- The application uses the `axios` library for making HTTP requests.
