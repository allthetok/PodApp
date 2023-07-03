const express = require('express')
const app = express()

app.use(express.json())

let users = [
    {
        id: 10829,
        content: 'The Joe Rogan Experience'
    }
]

app.get('/api/users', (request, response) => {
    response.json(users)
})

app.post('/api/user', (request, response) => {
    const user = request.body
    console.log(user)
    response.json(user)
})

const PORT = 3001

app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`)
})
