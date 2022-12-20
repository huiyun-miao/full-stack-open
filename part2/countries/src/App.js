import { useState, useEffect } from 'react'
import axios from 'axios'

const Filter = ({ searchKey, searchChange }) => {
  return (
    <form>
      find countries <input value={searchKey} onChange={searchChange}/>
    </form>
  )
}

const Weather = ({ country }) => {
  const api_key = process.env.REACT_APP_API_KEY
  const lat = country.capitalInfo.latlng[0]
  const lon = country.capitalInfo.latlng[1]
  const [weather, setWeather] = useState()
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${api_key}`
  
  useEffect(() => {
    axios
    .get(url)
    .then(response => {
      setWeather(response.data)
      })
  }, [url])

  if (weather) {
    return (
      <div>
        <h2>Weather in {country.capital}</h2>
        <p>temperature {weather.main.temp} Celcius</p>
        <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt='weather icon' />
        <p>wind {weather.wind.speed} m/s</p>
      </div>
    )
  }
}

const View = ({ country }) => {
  const languages = Object.values(country.languages)

  return (
    <div>
      <h1>{country.name.common}</h1>
      <p>capital {country.capital}</p>
      <p>area {country.area}</p>
      <h2>languages:</h2>
      <ul>
        {languages.map(language => <li key={language}>{language}</li>)}
      </ul>
      <img src={country.flags.png} alt='flag' />
    </div>
  )
}

const Button = ({ show, setShow }) => {
  return (
    <button onClick={() => setShow(!show)}>
      {show ? 'hide' : 'show'}
    </button>
  )
}

const Show = ({ show, country }) => {
  if (show) {
    return (
      <div>
        <View country={country} />
        <Weather country={country} />
      </div>
    )
  }
}

const Country = ({ country }) => {
  const [show, setShow] = useState(false)

  return (
    <div>
      {country.name.common}
      <Button show={show} setShow={setShow} />
      <Show show={show} country={country} />
    </div>
  )
}

const Display = ({ countries, searchKey }) => {
  if (searchKey === '') return

  if (countries.length > 10) {
    return <div>Too many matches, specify another filter</div>
  } else if (countries.length === 1) {
    return <View country={countries[0]} />
  } else {
    return (
      countries.map(country => 
        <div key={country.name.common}>
          <Country country={country} />
        </div>)
    )
  }
}

const App = () => {
  const [countries, setCountries] = useState([])
  const [searchKey, setSearchKey] = useState('')

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const searchChange = (event) => {
    setSearchKey(event.target.value)
  }

  const searchResult = (countries, searchKey) => {
    return (
      countries.filter(country => country.name.common.toLowerCase().includes(searchKey.toLowerCase()))
    )
  }

  return (
    <div>
      <Filter searchKey={searchKey} searchChange={searchChange} />
      <Display countries={searchResult(countries, searchKey)} searchKey={searchKey} />
    </div>
  )
}

export default App