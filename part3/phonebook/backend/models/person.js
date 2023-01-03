const mongoose = require('mongoose')

const url = process.env.MONGODB_URI

console.log('connecting to', url)

mongoose.connect(url)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

const numberValidator = (number) => {
  if (!number.includes('-')) {
    return false
  }

  const split = number.split('-')

  if (split.length !== 2) {
    return false
  }

  const part1 = split[0]
  const part2 = split[1]

  if (part1.length < 2 || part1.length > 3) {
    return false
  }

  if (isNaN(part1) || isNaN(part2)) {
    return false
  }

  return true
}

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    required: true
  },
  number: {
    type: String,
    minLength: 8,
    required: true,
    validate: numberValidator
  }
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Person', personSchema)