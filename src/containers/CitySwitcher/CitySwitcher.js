import ActiveCityBtn from '../../components/ActiveCityBtn';

import './CitySwitcher.scss';

const citiesArr = [
  'tashkent',
  'paris',
  'tokyo',
  'medina',
  'dubai',
  'moscow',
  'oslo',
  'minsk'
];

const CitySwitcher = ({setActiveCity, activeCity}) => {
  return (
    <div className="city-switcher">
      {
        citiesArr.map((city, index) => (
          <ActiveCityBtn
            cityName={city}
            key={index}
            onClick={() => setActiveCity(city)}
            active={activeCity == city}
          />
        ))
      }
    </div>
  )
}

export default CitySwitcher;