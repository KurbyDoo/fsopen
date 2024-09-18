import { useState, useEffect } from 'react'
import Filter from './components/Filter.jsx'
import NewPersonForm from './components/NewPersonForm.jsx'
import PersonsDisplay from './components/PersonsDisplay.jsx'
import Notification from './components/Notification.jsx'
import PhonebookServices from './services/phonebook.js'

const App = () => {
  const [persons, setPersons] = useState([])

  const [notificationInfo, setNotificationInfo] = useState({
    message: null,
    type: 'error'
  })

  useEffect(() => {
    PhonebookServices
      .getAll()
      .then(initialUsers => {
        setPersons(initialUsers)
      })
  })

  const deleteUserOf = (id) => {
    PhonebookServices
      .deleteId(id)
      .then(deletedPerson => {
        setPersons(persons.filter(p => p.id !== deletedPerson.id))
        setNotificationInfo({
          message: `Successfully deleted user '${deletedPerson.name}'`,
          type: 'error'
        })

      }).catch(error => {
        setNotificationInfo({
          message: 'User already deleted...',
          type: 'success'
        })
        
        setPersons(persons.filter(p => p.id !== id))
      })
    
      setTimeout(() => {
        setNotificationInfo({
          message: null,
          type: 'error'
        })
      }, 5000)
  }

  const [newFilter, setNewFilter] = useState('')
  const visiblePersons = persons.filter(person => person.name.toLowerCase().startsWith(newFilter))
  
  return (
    <div className='app'>
      <h1>Phonebook</h1>

      <Notification {...notificationInfo} />

      <Filter newFilter={newFilter} setNewFilter={setNewFilter}/>
      
      <h2>Add/Replace: </h2>
      <NewPersonForm persons={persons} setPersons={setPersons} setNotificationInfo={setNotificationInfo} />

      <h2>Numbers</h2>
      <PersonsDisplay persons={visiblePersons} deleteUserOf={deleteUserOf} />

    </div>
  )
}

export default App