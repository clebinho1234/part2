import { useState, useEffect } from 'react'
import Filter from './components/Filter.jsx'
import PersonForm from './components/PersonForm.jsx'
import Persons from './components/Persons.jsx'
import Notification from './components/Notification.jsx'
import personService from './services/persons.js'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [message, setMessage] = useState({})

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    };
    
    let duplicatedPersonIndex = -1
    persons.forEach(person => {
      if(person.name === newName){
        const id = person.id
        if (window.confirm(`${person.name} is already added to phonebook, replace the old number with a new one?`)) {
          
          personService
            .update(id, personObject)
            .then(returnedPersons => {
              setPersons(persons.map(person => person.id !== id ? person : returnedPersons))
              handleMessage({text: `${newName}'s number changed`, type: 'notification'})
            })
          // eslint-disable-next-line no-unused-vars
            .catch(error => 
             handleMessage({text: `Information of ${newName} has already been removed from server`, type: 'error'})
            )
        }
        duplicatedPersonIndex = id
      } 
    })

    if(duplicatedPersonIndex === -1) {
      personService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))          
        }) 
      handleMessage({text: `Added ${newName}`, type: 'notification'}) 
    }

    setNewName('')
    setNewNumber('')
  }

  const deletePerson = (person) => {
    if (window.confirm(`Delete ${person.name}?`)) {
      const id = person.id
      personService
        .remove(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id))
        })
        // eslint-disable-next-line no-unused-vars
        .catch(error => {
          handleMessage({text: `Error deleting ${person.name}`, type: 'error'});
        });
    }
  }

  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)
  const handleFilterChange = (event) => setFilter(event.target.value)
  const handleMessage = (message) => {
    setMessage(message)
    setTimeout(() => {
      const newMessage = {
        ...message,
        text: null
      }
      setMessage(newMessage)
    }, 5000)
  }

  const filteredPersons = persons.filter(person => 
      person.name.toLowerCase().includes(filter.toLowerCase())
    )

  return (
    <div>
      <h2>Phonebook</h2>

        <Notification text={message.text} type={message.type} />

        <Filter filter={filter} 
          handleFilterChange={handleFilterChange} 
        />
      
      <h3>Add a new</h3>

        <PersonForm addPerson={addPerson}
          newName={newName}
          handleNameChange={handleNameChange}
          newNumber={newNumber}
          handleNumberChange={handleNumberChange}
        />

      <h3>Numbers</h3>

      <Persons persons={filteredPersons}
        deletePerson={deletePerson}
      />
    </div>
  )
}

export default App
