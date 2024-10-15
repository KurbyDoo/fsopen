const express = require("express")
const morgan = require("morgan")
const app = express()

app.use(express.json())

morgan.token('body', (req) => JSON.stringify(req.body));
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

let users = [
  {
    "id": "1",
    "name": "Arto Hellas",
    "number": "040-123456"
  },
  {
    "id": "2",
    "name": "Ada Lovelace",
    "number": "39-44-5323523"
  },
  {
    "id": "3",
    "name": "Dan Abramov",
    "number": "12-43-234345"
  },
  {
    "id": "4",
    "name": "Mary Poppendieck",
    "number": "39-23-6423122"
  }
]

const generateID = () => {
  const newID = Math.ceil(Math.random() * 100000)

  return String(newID);
}

app.get('/api/persons', (request, response) => {
  response.json(users)
})

app.get('/info', (request, response) => {
  response.send(`<p>Phonebook has info for ${users.length} people </br></br>${Date()}</p>`)
})

app.get('/api/persons/:id', (request, response) => {
  const id = request.params.id
  const person = users.find(person => person.id === id)
  if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  }
})

app.delete('/api/persons/:id', (request, response) => {
  const id = request.params.id
  users = users.filter(person => person.id !== id)

  response.status(204).end()
})

app.post('/api/persons', (request, response) => {
  const body = request.body

  if (!body.name && !body.number) {
    return response.status(400).json({
      error: "Missing name and number"
    })
  }

  if (!body.name) {
    return response.status(400).json({
      error: "Missing name"
    })
  }

  if (!body.number) {
    return response.status(400).json({
      error: "Missing number"
    })
  }

  if (users.find(person => person.name === body.name)) {
    return response.status(400).json({
      error: "User already exists (name must be unique)"
    })
  }
  
  const person = {
    name: body.name,
    number: body.number,
    id: generateID()
  }

  users = users.concat(person)
  response.json(users)
})

const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)