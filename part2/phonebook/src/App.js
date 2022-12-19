import { useState } from 'react'

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
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchKey, setSearchKey] = useState('')

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