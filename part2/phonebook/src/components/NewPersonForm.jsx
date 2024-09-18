import { useState } from 'react'
import phonebookServices from '../services/phonebook'

const NewPersonForm = ({ persons, setPersons, setNotificationInfo }) => {
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')

    const addNumber = (event) => {
        event.preventDefault()
        const newPerson = {
            name: newName,
            number: newNumber,
        }

        const exists = persons.some(person => {
            if (person.name.toLowerCase() !== newName.toLowerCase()) return false
            if (!window.confirm(`${newName} is already added to phonebook. Replace user instead?`)) return true
            phonebookServices
                .update(person.id, newPerson)
                .then(updatedPerson => {
                    setPersons(persons.map(p => p.id === updatedPerson.id ? updatedPerson : p))
                    setNotificationInfo({
                        message: `Successfully updated user '${updatedPerson.name}'`,
                        type: 'success'
                    })
                })
                .catch(error => {
                    setNotificationInfo({
                        message: 'User no longer exists',
                        type: 'error'
                    })
                })
            setNewName('')
            setNewNumber('')

            setTimeout(() => {
                setNotificationInfo({
                    message: null,
                    type: 'error'
                })
            }, 5000)

            return true
        })

        if (exists) return

        phonebookServices
            .create(newPerson)
            .then(createdPerson => {
                setPersons(persons.concat(createdPerson))
                setNotificationInfo({
                    message: `Added '${createdPerson.name}' to the phonebook`,
                    type: 'success'
                })
                
                setNewName('')
                setNewNumber('')
            })
            .catch(error => {
                setNotificationInfo({
                    message: 'An error has occurred: ' + error.message,
                    type: 'error'
                })
            })
        
        setTimeout(() => {
            setNotificationInfo({
                message: null,
                type: 'error'
            })
        }, 5000)

    }

    const handleNameChange = (event) => {
        setNewName(event.target.value)
    }

    const handleNumberChange = (event) => {
        setNewNumber(event.target.value)
    }

    return (
        <form>
            <div className='input_div'>
                <div>Name: </div> <input value={newName} onChange={handleNameChange} enterKeyHint='Enter Name Here' />
            </div>
            <div className='input_div'>
                <div>Number: </div> <input value={newNumber} onChange={handleNumberChange} enterKeyHint='Enter Number Here' />
            </div>
            <div>
                <button type="submit" onClick={addNumber}>add</button>
            </div>
        </form>
    )
}

export default NewPersonForm