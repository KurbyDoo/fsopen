import { useState, useEffect } from 'react'
import axios from 'axios'
import Note from './components/Note'
import noteService from './services/notes'
import Notification from './components/Notification'

const Footer = () => {
  const footerStyle = {
    color: 'green',
    fontStyle: 'italic',
    fontSize: 16
  }

  return (
    <div style={footerStyle}>
      <br />
      <em>Note app, from Full Stack Open</em>
    </div>
  )
}

const App = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState('Error Message Here')

  useEffect(() => {
    console.log("Effect")
    noteService
      .getAll()
      .then(initialNotes => {
        setNotes(initialNotes)
      })
  }, [])

  const addNote = (event) => {
    event.preventDefault()
    const newNoteObject = {
      content: newNote,
      important: Math.random() > 0.5,
      // id: notes.length + 1 // Autogenerates on POST
    }
    
    noteService
    .create(newNoteObject)
    .then(createdNote => {
      setNotes(notes.concat(createdNote))
      setNewNote('')
    })
  }

  const handleNoteChange = (event) => {
    setNewNote(event.target.value)
  }

  const toggleImportanceOf = (id) => {
    console.log(`toggling ${id}`)
    const note = notes.find(n => n.id === id)
    const newNote = { ...note, important: !note.important }
    
    noteService
      .update(id, newNote)
      .then(updatedNote => {
        setNotes(notes.map(n => n.id === id ? updatedNote : n))
      })
      .catch(error => {
        setErrorMessage(
          `Note '${note.content} was already removed from server`
        )

        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
        setNotes(notes.filter(n => n.id !== id))
      })
  }
  const notesToShow = showAll ? notes : notes.filter(note => note.important)

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage}/>
      <div>
        <button onClick={() => setShowAll(!showAll)}>show {showAll ? 'important' : 'all'}</button>
      </div>
      <ul>
        {notesToShow.map(note => 
          <Note
            key={note.id}
            note={note}
            toggleImportance={() => toggleImportanceOf(note.id)}
          />
        )}
      </ul>
      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange} enterKeyHint='type here'/>
        <button type="submit">save</button>
      </form>
      <Footer />
    </div>
  )
}

export default App