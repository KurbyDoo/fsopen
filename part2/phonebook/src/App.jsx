import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])

  const [newFilter, setNewFilter] = useState('')
  const visiblePersons = persons.filter(person => person.name.toLowerCase().startsWith(newFilter))
  
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter newFilter={newFilter} setNewFilter={setNewFilter}/>
      
      <h2>Add a new</h2>
      <NewPersonForm persons={persons} setPersons={setPersons} />

      <h2>Numbers</h2>
      <PersonsDisplay persons={visiblePersons} />

    </div>
  )
}

const Filter = ({ newFilter, setNewFilter }) => {
  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  return (
    <div>
      filter names: <input value={newFilter} onChange={handleFilterChange} enterKeyHint='Enter Name Filter' />
    </div>
  )
}

const NewPersonForm = ({ persons, setPersons }) => {
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const addNumber = (event) => {
    event.preventDefault()
    const newPerson = {
      name: newName,
      number: newNumber,
      id: persons.length + 1
    }

    const exists = persons.some(person => {
      if (person.name !== newName) return false
      alert(`${newName} is already added to phonebook`)
      return true
    })

    if (!exists) setPersons(persons.concat(newPerson))
    setNewName('')
    setNewNumber('')
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  return (
    <form>
      <div>
        name: <input value={newName} onChange={handleNameChange} enterKeyHint='Enter Name Here' />
      </div>
      <div>
        number: <input value={newNumber} onChange={handleNumberChange} enterKeyHint='Enter Number Here' />
      </div>
      <div>
        <button type="submit" onClick={addNumber}>add</button>
      </div>
    </form>
  )
}

const PersonsDisplay = ({persons}) => <div> {persons.map(person => <Number key={person.id} name={person.name} number={person.number} />)}</div>

const Number = ({ name, number }) => <div>{name} {number}</div>

export default App