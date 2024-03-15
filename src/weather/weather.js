import React, { useState } from "react";
import './weather.css';
import searchicon from '../assests/search.png';
import clearicon from '../assests/clear.png';
import cloudicon from '../assests/cloud.png';
import drizzleicon from '../assests/drizzle.png';
import humidityicon from '../assests/humidity.png';
import rainicon from '../assests/rain.png';
import snowicon from '../assests/snow.png';
import windicon from '../assests/wind.png';

function Weatherapp() {
    let api_key = "4068c8d38d74de0f4509613d1db6a6b7";
    const [weatherIcon, setWeatherIcon] = useState(cloudicon); // Changed the name to avoid conflict

    const search = async () => {
        const element = document.getElementsByClassName("cityInput");
        if (element[0].value === "") {
            return 0;
        }
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=Metric&appid=${api_key}`;

        let response = await fetch(url);
        let data = await response.json();

        const humidity = document.getElementsByClassName("humidity-percent");
        const wind = document.getElementsByClassName("wind-rate");
        const temperature = document.getElementsByClassName("weather-temp");
        const location = document.getElementsByClassName("weather-location");

        humidity[0].innerHTML = data.main.humidity + "%";
        wind[0].innerHTML = data.wind.speed + " km/hr";
        temperature[0].innerHTML = data.main.temp + "°C";
        location[0].innerHTML = data.name;

        if (data.weather[0].icon === "01d" || data.weather[0].icon === "01n") {
            setWeatherIcon(clearicon);
        } else if (data.weather[0].icon === "02d" || data.weather[0].icon === "02n") {
            setWeatherIcon(cloudicon)
        } else if (data.weather[0].icon === "03d" || data.weather[0].icon === "03n") {
            setWeatherIcon(drizzleicon)
        } else if (data.weather[0].icon === "04d" || data.weather[0].icon === "04n") {
            setWeatherIcon(drizzleicon)
        } else if (data.weather[0].icon === "09d" || data.weather[0].icon === "09n") {
            setWeatherIcon(rainicon)
        } else if (data.weather[0].icon === "10d" || data.weather[0].icon === "10n") {
            setWeatherIcon(rainicon)
        } else if (data.weather[0].icon === "13d" || data.weather[0].icon === "13n") {
            setWeatherIcon(snowicon)
        } else {
            setWeatherIcon(clearicon)
        }
    }

    return (
        <div>
            <div className="container">
                <div className="top-bar">
                    <input type="text" className="cityInput" placeholder="Search" />
                    <div className="search-icon" onClick={search}>
                        <img src={searchicon} alt="" />
                    </div>
                </div>
                <div className="weather-image">
                    <img src={weatherIcon} alt="" /> {/* Changed to use weatherIcon */}
                </div>
                <div className="weather-temp"></div>
                <div className="weather-location"></div>
                <div className="data-container">
                    <div className="element">
                        <img src={humidityicon} className="icon" />
                        <div className="data">
                            <div className="humidity-percent"></div>
                            <div className="text">Humidity</div>
                        </div>
                    </div>
                    <div className="element">
                        <img src={windicon} className="icon" />
                        <div className="data">
                            <div className="wind-rate"></div>
                            <div className="text">Wind Speed</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Weatherapp;
