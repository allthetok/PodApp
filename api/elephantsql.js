require('dotenv').config()
const express = require('express')
const cors = require('cors')
const app = express()
const pg = require('pg')

const corsOptions ={
    origin:'http://localhost:3000', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}

const requestLogger = (request, response, next) => {
    console.log('Method:', request.method)
    console.log('Path: ', request.path)
    console.log('Body: ', request.body)
    console.log('---')
    next()
}

app.use(express.json())
app.use(requestLogger)
app.use(cors(corsOptions))

const client = new pg.Client(process.env.BACKEND_DB_STRING)
client.connect((err) => {
    if (err) {
        return console.error('could not connect to Database', err)
    }
    return console.log('Successfully connected to database')
})

app.get('/api/users', async (request, response) => {
    const queryText = 'SELECT * from tblUser'
    const queryResults = await client.query(queryText)
    console.log(queryResults.rows)
    response.json(queryResults.rows)
})

app.post('/api/user', async(request, response) => {
    const obj = request.body
    const struser = request.body.struser
    const strpass = request.body.strpass
    const values = [struser, strpass]
    const queryResults = await client.query('INSERT INTO tblUser(struser, strpass, dtmcreated, dtmlastlogin) VALUES($1, $2, NOW(), NOW()) RETURNING *', values)
    response.json(queryResults.rows[0])
})

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`)
})






