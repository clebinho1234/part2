import { useState, useEffect } from 'react'
import Filter from './components/Filter.jsx'
import Display from './components/Display.jsx'
import WeatherDisplay from './components/WeatherDisplay.jsx'
import axios from 'axios'

function App() {
  const [filter, setFilter] = useState('')
  const [countries, setCountries] = useState(null)
  const [weather, setWeather] = useState(null)
  const api_key = import.meta.env.VITE_SOME_KEY

  useEffect(() => {
    if (filter !== '') {
      axios
        .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
        .then(response => {
          const filteredCountries = response.data.filter(country =>
            country.name.common.toLowerCase().includes(filter.toLowerCase())
          )
          setCountries(filteredCountries)
        })
        .catch(error => {
          console.error("Error searching countries:", error);
        });     
    }
  }, [filter])

  useEffect(() => {
    if (countries && countries.length === 1) 
      handleWeather(countries[0])
    else
      setWeather(null)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [countries])

  const handleFilterChange = (event) => setFilter(event.target.value)
  const handleCountry = (name) => {
    axios
      .get(`https://studies.cs.helsinki.fi/restcountries/api/name/${name}`)
      .then(response => 
        setCountries([response.data])
      )
      .catch(error => {
        console.error("Error searching country:", error);
      });
  }

  const handleWeather = (country) => {
    const lat = country.capitalInfo.latlng[0]
    const lon = country.capitalInfo.latlng[1]
    axios
      .get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}`)
      .then(response => 
        setWeather(response.data)
      )
      .catch(error => {
        console.error("Error searching weather:", error);
      });
  }

  return (
    <div>
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <Display countries={countries} handleCountry={handleCountry} />
      {weather && (
        <>
          <h2>Weather in {countries[0].capital}</h2>
          <WeatherDisplay weather={weather} />
        </>
      )}
    </div>
  )
}

export default App
