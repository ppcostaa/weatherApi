import React, { useState, useEffect} from "react";
import axios from 'axios';

const Weather = () => {
    const [weatherData, setWeatherData] = useState(null);
    const [city, setcity] = useState('Rio de Janeiro');
    const [error, serError] = useState(null);
    const [loading, setLoading] = useState(true);

    const apiKey = 'caac95df4bdd2c9d7c22744fcee8b514';
    const apiURL = `https://api.weatherstack.com/current=${apiKey}&query=${city}`;

    useEffect(() => {
        const fetchWeatherData = async () => {
            setLoading(true);
            try{
                const response = await axios.get(apiURL);
                setWeatherData(response.data);
            } catch (err){
            setError(err);
            } finally{
                setLoading(false);
            }
        };

        fetchWeatherData();
    }, [city]);

    const handleCityChange = (e) => {
        setcity(e.target.value);
    };

    if (loading) {
        return <div>Loading...</div>;
    }
    if (error) {
        return <div>Error: {error.message}</div>;
    }
    if (!weatherData || !weatherData.current){
        return <div>No data available.</div>;
    }

    return (
        <div>
            <h1>Weather Information</h1>
            <input
            type="text"
            value={city}
            onChange={handleCityChange}
            placeholder="Enter City"
            />
            <div>
                <h2>{weatherData.location.name}, {weatherData.location.country}</h2>
                <p>Temperature: {weatherData.current.temperature}ºC</p>
                <p>Weather: {weatherData.current.weather_description[0]}</p>
                <img src={weatherData.current.weather_icons[0]} alt="weather icon" />
                <p>Wind Speed: {weatherData.current.wind_speed} km/h</p>
                <p>Precip: {weatherData.current.precip} mm</p>
                <p>Pressure: {weatherData.current.pressure} mb</p>
            </div>
        </div>
    );
};

export default Weather;