const express = require('express')
const cors = require('cors')
const app = express()

app.use(express.json())

const corsOptions ={
    origin:'http://localhost:3000', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
app.use(cors(corsOptions))

let users = [
    {
        id: 10829,
        content: 'The Joe Rogan Experience'
    }
]

app.get('/api/users', (request, response) => {
    response.json(users)
})

app.post('/api/likes', (request, response) => {
    const user = request.body
    console.log(user)
    response.json(user)
})

const PORT = 3001

app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`)
})
