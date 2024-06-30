import React, { useState } from "react";
import axios from 'axios';

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState('');

  // Your OpenWeatherMap API key
  const API_KEY = '';

  // Function to get coordinates of the location
  const getCoordinates = async (location) => {
    const geocodeUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=1&appid=${API_KEY}`;
    try {
      const response = await axios.get(geocodeUrl);
      if (response.data.length > 0) {
        const { lat, lon } = response.data[0];
        return { lat, lon, country: response.data[0].country };
      } else {
        alert("Location not found");
        return null;
      }
    } catch (error) {
      console.error("Error fetching coordinates:", error);
      return null;
    }
  };

  // Function to get weather data using coordinates
  const getWeatherData = async (lat, lon, country) => {
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${API_KEY}`;
    try {
      const response = await axios.get(weatherUrl);
      setData({ ...response.data, country });
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  // Function to handle search
  const searchLocation = async (event) => {
    if (event.key === 'Enter') {
      const coordinates = await getCoordinates(location);
      if (coordinates) {
        await getWeatherData(coordinates.lat, coordinates.lon, coordinates.country);
      }
    }
  };

  // Function to convert Fahrenheit to Celsius
  const toCelsius = (fahrenheit) => {
    return ((fahrenheit - 32) * 5) / 9;
  };

  // Function to convert MPH to KPH
  const toKPH = (mph) => {
    return mph * 1.60934;
  };

  return (
    <div className="app">
      <div className="search">
        <input
          className="search-box"
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          onKeyPress={searchLocation}
          placeholder="Enter Location"
          type="text"
        />
      </div>
      <div className="container">
        <div className="top">
          <div className="location">
          {data.name && data.country && <p>{data.name}, {data.country}</p>}
          </div>
          <div className="temp">
            {data.main && <h1>{Math.round(toCelsius(data.main.temp))}°C</h1>}
          </div>
          <div className="description">
            {data.weather && <p>{data.weather[0].description}</p>}
          </div>
        </div>
        {data.main && (
          <div className="bottom">
            <div className="feels">
              <p className="bold">{Math.round(toCelsius(data.main.feels_like))}°C</p>
              <p>Feels Like</p>
            </div>  
            <div className="humidity">
              <p className="bold">{data.main.humidity}%</p>
              <p>Humidity</p>
            </div>
            <div className="wind">
              <p className="bold">{Math.round(toKPH(data.wind.speed))} KPH</p>
              <p>Wind Speed</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;