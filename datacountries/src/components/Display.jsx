
const Display = ({ countries, handleCountry }) => {
        
    if(!countries || countries.length > 10){
        return(
            <div>
              <p>
                Too many matches, specify another filter
              </p>
            </div>
        )
    }
    
    if(countries.length === 1){
        const country = countries[0]
        return(
            <div>
              <h1>{country.name.common}</h1>
                <p>capital {country.capital}</p>
                <p>area {country.area}</p>
                <p>population {country.population}</p>
              <h3>languages:</h3>
                <ul>
                  {Object.values(country.languages).map((language, index) => (
                    <li key={index}>{language}</li>
                  ))}
                </ul>
              <img src={country.flags.png} alt={country.flags.alt} />
            </div>
        )
    }

    return(
        <div>
          {countries.map(country =>(
            <div key={country.cca3}>
              {country.name.common}
              <button onClick={() => handleCountry(country.name.common)}>
                 show
              </button>
            </div>
          ))}
        </div>
    )
}

export default Display