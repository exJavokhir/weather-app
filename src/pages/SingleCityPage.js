import axios from "axios";
import weatherCodeParse from "../helpers/weatherCodeParse";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Styledh1, Wrapper } from "./StyledComponents";
import './app.scss'

const SingleCityPage = ({ match }) => {
  const [activeWeather, setActiveWeather] = useState({
    isFetched: false,
    data: {},
    error: null,
  });

  const fetchWeatherInfo = () => {
    axios
      .get(`https://api.openweathermap.org/data/2.5/weather`, {
        params: {
          q: match.params.cityName,
          appid: "5ec646c90ce3554cf8cfb59c954c2849",
          units: "metric",
        },
      })
      .then(function (response) {
        setActiveWeather({
          isFetched: true,
          data: response.data,
          error: false,
        });
      })
      .catch(function (error) {
        setActiveWeather({
          isFetched: true,
          data: {},
          error: error,
        });
      })
      .then(function () {
        // always executed
      });
  };
  console.log(activeWeather);
  console.log(match.params.cityName);
  useEffect(() => {
    fetchWeatherInfo();
  }, [match.params.cityName]);
const BgHandler = (weatherCode) => {
  switch (true) {
    case 200 <= weatherCode && weatherCode <= 232:
      return "https://images.unsplash.com/photo-1561485132-59468cd0b553?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1248&q=80";
    case 300 <= weatherCode && weatherCode <= 321:
      return "https://images.unsplash.com/photo-1556046683-f8c5a47641d1?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1377&q=80";
    case 500 <= weatherCode && weatherCode <= 531:
      return "https://images.unsplash.com/photo-1534274988757-a28bf1a57c17?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=675&q=80";
    case 600 <= weatherCode && weatherCode <= 622:
      return "https://images.unsplash.com/photo-1477601263568-180e2c6d046e?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80";
    case 701 <= weatherCode && weatherCode <= 781:
      return "https://images.unsplash.com/photo-1454789476662-53eb23ba5907?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=689&q=80";
    case weatherCode == 800:
      return "https://images.unsplash.com/photo-1607463747053-9c90f8341cd8?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80";
    case 801 <= weatherCode && weatherCode <= 804:
      return "https://images.unsplash.com/photo-1603436455701-a2507fed0898?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80";
    default:
      return "https://images.unsplash.com/photo-1558486012-817176f84c6d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=619&q=80";
  }
};
  return (
    <>
      {activeWeather.isFetched ? (
        <div
          className={`main-weather main-app`}
          style={{
            background: `url(${
              activeWeather.isFetched
                ? BgHandler(activeWeather.data.weather[0].id)
                : null
            })`,
          }}
        >
          <Styledh1>
            <motion.span
              style={{ display: "block" }}
              initial={{ scale: 0, rotate: -180 }}
              animate={{ rotate: 0, scale: 1 }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 20,
              }}
            >
              {activeWeather.data.name}
            </motion.span>
          </Styledh1>
          <h1>{Math.round(activeWeather.data.main.temp)}° C</h1>
          <motion.img
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20,
            }}
            src={weatherCodeParse(activeWeather.data.weather[0].id)}
            className="weather-icon"
            alt=""
          />
          <>
            {activeWeather.data.weather.map((weather) => (
              <Wrapper>
                <motion.h1
                  animate={{
                    opacity: 1,
                    y: 0,
                    transition: {
                      duration: 2,
                      delayChildren: 0.3,
                      staggerChildren: 0.2,
                    },
                  }}
                  initial={{
                    y: 100,
                    opacity: 0,
                  }}
                >
                  It's {" "}
                  <motion.span
                    style={{ display: "inline-block" }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      transition: {
                        duration: 3,
                      },
                    }}
                    initial={{
                      y: 200,
                      opacity: 0,
                    }}
                    className="weather-status"
                  >
                    {weather.main}
                  </motion.span>{" "}
                  now in{" "}
                  <motion.span
                    style={{ display: "inline-block" }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      transition: {
                        duration: 3,
                      },
                    }}
                    initial={{
                      y: -200,
                      opacity: 0,
                    }}
                    className="weather-city"
                  >
                    {activeWeather.data.name}
                  </motion.span>
                </motion.h1>
              </Wrapper>
            ))}
          </>
        </div>
      ) : (
        <div class="loading">
          <div></div>
          <div></div>
          <div></div>
        </div>
      )}
    </>
  );
};

export default SingleCityPage;
