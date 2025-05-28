import React, { useState } from 'react';

import './Data.css'
const Data = () => {
    const [loc, setLoc] = useState('');
    const [weather, setWeather] = useState({});

    const api_key = "f4eec22528973110fccfa2c75125154b";

    const getWeather = (e) => {
        e.preventDefault();
        fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${loc}&appid=${api_key}`)
            .then(res => res.json())
            .then(json => {
                console.log(json.list[0].main.temp);
                setWeather(json);
            })
            .catch(error => console.error('Error fetching data:', error));
    }

    const handleLoc = (e) => {
        setLoc(e.target.value);
    }

    const kelvinToCelsius = (temp) => {
        return (temp - 273.15).toFixed(0);
    }

    return (
        <div className="container mt-5">
            <h1 className="text-center mb-4">Weather App</h1>
            <div className="row justify-content-center mb-3">
                <div className="col-md-6">
                    <input 
                        type="text" 
                        onChange={handleLoc} 
                        placeholder="Enter location" 
                        className="form-control mb-2"
                    />
                    <button onClick={getWeather} className="btn btn-primary w-100">Search</button>
                </div>
            </div>
            {weather.list && weather.list.length > 0 && (
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="card text-center">
                            <div className="card-body">
                                <h5 className="card-title">City: {weather.city.name}</h5>
                                <p className="card-text">Temperature: {kelvinToCelsius(weather.list[0].main.temp)} °C</p>
                                <p className="card-text">Weather: {weather.list[0].weather[0].description}</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Data;
