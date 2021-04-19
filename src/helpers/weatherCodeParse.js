import clear from '../assets/icons/sunrise.svg';
import drizzle from '../assets/icons/drizzle.svg';
import rain from '../assets/icons/rain.svg';
import tornado from '../assets/icons/tornado.svg';
import thunderstorm from '../assets/icons/thunder.svg';
import snow from '../assets/icons/snow.svg';
import clouds from '../assets/icons/stratuscumulus.svg';
import defaultIcon from '../assets/icons/weathercock.svg';

const weatherCodeParse = (weatherCode) => {
  switch (true) {
    case 200 <= weatherCode && weatherCode <= 232:
      return thunderstorm;
    case 300 <= weatherCode && weatherCode <= 321:
      return drizzle;
    case 500 <= weatherCode && weatherCode <= 531:
      return rain;
    case 600 <= weatherCode && weatherCode <= 622:
      return snow;
    case 701 <= weatherCode && weatherCode <= 781:
      return tornado;
    case weatherCode == 800:
      return clear;
    case 801 <= weatherCode && weatherCode <= 804:
      return clouds;
    default:
      return defaultIcon;
  }
};

export default weatherCodeParse;