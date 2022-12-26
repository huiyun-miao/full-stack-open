const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()

app.use(express.json())
app.use(cors())
app.use(express.static('build'))

let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/api/persons', (request, response, next) => {
  response.json(persons)
  next()
})

app.get('/info', (request, response, next) => {
  const number = persons.length
  response.send(
    `<p>Phonebook has info for ${number} people<p/>
    <p>${new Date()}</p>`
  )
  next()
})

app.get('/api/persons/:id', (request, response, next) => {
  const id = Number(request.params.id)
  const person = persons.find(p => p.id === id)
  if (person) {
    response.json(person)
  } else {
    response.status(404).send('id was not found')
  }
  next()
})

app.delete('/api/persons/:id', (request, response, next) => {
  const id = Number(request.params.id)
  persons = persons.filter(p => p.id !== id)
  response.status(204).end()
  next()
})

const randomId = () => {
  let id = Math.floor(Math.random() * 10000)
  while (persons.includes(p => p.id === id)) {
    id = Math.floor(Math.random() * 10000)
  }
  return id
}

app.post('/api/persons', (request, response, next) => {
  const body = request.body

  if (!body.name || !body.number) {
    return response.status(400).json({ 
      error: 'name or number is missing' 
    })
  }

  if (persons.map(p => p.name).includes(body.name)) {
    return response.status(400).json({
      error: 'name must be unique'
    })
  }

  const person = {
    id: randomId(),
    name: body.name,
    number: body.number
  }

  persons = persons.concat(person)
  response.json(person)
  next()
})

morgan.token('data', (request, response) => {
  if (request.method !== 'POST') {
    return
  } else {
    return JSON.stringify(request.body)
  }
})

app.use(morgan(':method :url :status :res[content-length] :response-time ms :data'))

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})