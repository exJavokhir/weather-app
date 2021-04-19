import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  motion
} from "framer-motion";

import axios from 'axios';

import weatherCodeParse from '../../helpers/weatherCodeParse';

import './Header.scss';

const Header = () => {
  const [ searchText, setSearchText ] = useState('');
  const [ weatherInfo, setWeatherInfo ] = useState({
    isFetched: false,
    name: '',
    weather: [],
    temp: {},
    error: null
  });

  const fetchWeatherInfo = () => {
    axios.get(`https://api.openweathermap.org/data/2.5/weather`, {
      params: {
        q: searchText,
        appid: '5ec646c90ce3554cf8cfb59c954c2849',
        units: 'metric'
      }
    })
    .then(function (response) {
      setWeatherInfo({
        isFetched: true,
        name: response.data.name,
        weather: response.data.weather,
        temp: response.data.main,
        error: false
      })
    })
    .catch(function (error) {
      setWeatherInfo({
        isFetched: true,
        name: '',
        weather: [],
        temp: {},
        error: error
      })
    })
    .then(function () {
      // always executed
    });  
  }

  useEffect(() => {
    fetchWeatherInfo();
  }, [searchText])

  console.log(weatherInfo.weather);
  return (
    <header className="header">
      <motion.h1 initial={{opacity: 0,x: 100 }} animate={{opacity: 1,x: 0,transition: {duration: 1.5}}}>
        <Link to={`/`}>Weather</Link>
      </motion.h1>

      <div className="search-input">
        <input
          type="search"
          placeholder="Find your city"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />

        {
          searchText.length > 0 ? (
            <div className="search-result">
              {
                weatherInfo.isFetched ? (
                  <div>
                    {
                      weatherInfo.weather.length > 0 ? (
                        <Link
                          to={`/city/${weatherInfo.name}`}
                          className="weather-result-card"
                        >
                          <h3>{weatherInfo.name}</h3>
                          <img src={weatherCodeParse(weatherInfo.weather[0].id)} alt="" className="weather-result-icon"/>
                          <h3>{Math.round(weatherInfo.temp.temp)}° C</h3>
                        </Link>
                      ) : (
                        <h3>City not found</h3>
                      )
                    }
                  </div>
                ) : (
                  <h1>Loading...</h1>
                )
              }
            </div>
          ) : (
            <div></div>
          )
        }
      </div>
    </header>
  )
}

export default Header;