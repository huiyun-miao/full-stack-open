import { useState, useEffect } from 'react'
import phonebookService from './services/phonebook'

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

const Person = ({ person, deletePerson }) => {
  return (
    <div>
      {person.name} {person.number}
      <button onClick={deletePerson}>delete</button>
    </div>
  )
}

const Notification = ({ message }) => {
  if (message === '') {
    return
  }

  return (
    <div className='notification'>
      {message}
    </div>
  )
}

const Error = ({ message }) => {
  if (message === '') {
    return
  }

  return (
    <div className='error'>
      {message}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchKey, setSearchKey] = useState('')
  const [message, setMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    phonebookService
      .getAll()
      .then(initialData => {
        setPersons(initialData)
      })
  }, [])

  const changeNumberOf = (id) => {
    const person = persons.find(p => p.id === id)
    const changePerson = { ...person, number: newNumber }

    phonebookService
      .update(id, changePerson)
      .then(returnedPerson => {
        setPersons(persons.map(p => p.id !== id ? p : returnedPerson))
        setNewName('')
        setNewNumber('')
      })
      .catch(error => {
        setErrorMessage(
          `Information of ${newName} has already been removed from server`
        )
        setTimeout(() => {setErrorMessage('')}, 5000)
        setNewName('')
        setNewNumber('')
        setPersons(persons.filter(p => p.id !== id))
      })
  }

  const addPerson = (event) => {
    event.preventDefault()
    if (persons.map(person => person.name).includes(newName)) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const person = persons.find(p => p.name === newName)
        return changeNumberOf(person.id)
      } else {
          setNewName('')
          setNewNumber('')
          return
      }
    }

    const personObject = {
      name: newName,
      number: newNumber
    }

    phonebookService
      .create(personObject)
      .then(newPerson => {
        setPersons(persons.concat(newPerson))
        setNewName('')
        setNewNumber('')
        setMessage(`Added ${newName}`)
        setTimeout(() => {setMessage('')}, 5000)
      })
      .catch(error => {
        console.log(error.response.data.error)
        setErrorMessage(error.response.data.error)
        setTimeout(() => {setErrorMessage('')}, 5000)
      })
  }

  const deletePerson = (person) => {
    const id = person.id
    if (window.confirm(`Delete ${person.name}?`)) {
      phonebookService
        .deleteById(id)
        .then(
          setPersons(persons.filter(p => p.id !== id))
        )
    }
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
      <Notification message={message} />
      <Error message={errorMessage} />
      <Filter searchKey={searchKey} searchChange={searchChange} />
      <h3>add a new</h3>
      <PersonForm addPerson={addPerson} newName={newName} newNumber={newNumber} 
        nameChange={nameChange} numberChange={numberChange} />
      <h3>Numbers</h3>
      {searchResult(persons, searchKey).map(person => 
        <Person 
          key={person.id} 
          person={person} 
          deletePerson={() => deletePerson(person)}
        />
      )}
    </div>
  )
}

export default App