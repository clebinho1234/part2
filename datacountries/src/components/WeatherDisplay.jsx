
const WeatherDisplay = ({ weather }) => {
    return(
        <div>
            <p>temperature {(weather.main.temp - 273.15).toFixed(2)} Celsius</p>
            <img src = {`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt={weather.weather[0].description} />
            <p>wind {weather.wind.speed} m/s</p>
        </div>
    )
}

export default WeatherDisplay