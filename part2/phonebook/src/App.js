import { useState, useEffect } from 'react'
import axios from 'axios'

const Filter = ({ searchKey, searchChange }) => {
  return (
    <form>
      filter shown with <input value={searchKey} onChange={searchChange}/>
    </form>
  )
}

const PersonForm = ({ addPerson, newName, nameChange, newNumber, numberChange }) => {
  return (
    <form onSubmit={addPerson}>
      <div>name: <input value={newName} onChange={nameChange}/></div>
      <div>number: <input value={newNumber} onChange={numberChange}/></div>
      <div><button type="submit">add</button></div>
    </form>
  )
}

const Persons = ({ persons }) => {
  return (
    persons.map(person => <div key={person.name}>{person.name} {person.number}</div>)
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchKey, setSearchKey] = useState('')

  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    if (persons.map(person => person.name).includes(newName)) {
      return (
        window.alert(`${newName} is already added to phonebook`)
      )
    }
    const personObject = {
      name: newName,
      number: newNumber
    }

    setPersons(persons.concat(personObject))
    setNewName('')
    setNewNumber('')
  }

  const nameChange = (event) => {
    setNewName(event.target.value)
  }

  const numberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const searchChange = (event) => {
    setSearchKey(event.target.value)
  }

  const searchResult = (persons, searchKey) => {
    return (
      persons.filter(person => person.name.toLowerCase().includes(searchKey.toLowerCase()))
    )
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter searchKey={searchKey} searchChange={searchChange} />
      <h3>add a new</h3>
      <PersonForm addPerson={addPerson} newName={newName} newNumber={newNumber} 
        nameChange={nameChange} numberChange={numberChange} />
      <h3>Numbers</h3>
      <Persons persons={searchResult(persons, searchKey)} />
    </div>
  )
}

export default App