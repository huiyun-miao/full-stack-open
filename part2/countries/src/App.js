import { useState, useEffect } from 'react'
import axios from 'axios'

const Filter = ({ searchKey, searchChange }) => {
  return (
    <form>
      find countries <input value={searchKey} onChange={searchChange}/>
    </form>
  )
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
    return <View country={country} />
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