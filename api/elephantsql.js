require('dotenv').config()
const express = require('express')
const cors = require('cors')
const app = express()
const pg = require('pg')

const corsOptions ={
    origin:'http://localhost:3001', 
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

app.post('/api/user', async (request, response) => {
    const struser = request.body.struser
    const strpass = request.body.strpass
    const newUser = request.body.newUser
    const values = [struser, strpass]
    let queryResults, queryText

    if (!struser || !strpass) {
        return response.status(400).json({
            error: 'Username or password missing'
        })
    }
    if (typeof(newUser) === 'undefined') {
        return response.status(400).json({
            error: 'Did not specify if signin or signup'
        })
    }

    if (!newUser) {
        await client.query('UPDATE tblUser SET dtmlastlogin = NOW() WHERE struser = $1 AND strpass = $2;', values)
        queryText = 'SELECT * from tblUser WHERE struser = $1 AND strpass = $2'
        queryResults = await client.query(queryText, values)
    }
    else {
        queryText = 'INSERT INTO tblUser(struser, strpass, dtmcreated, dtmlastlogin) VALUES($1, $2, NOW(), NOW()) RETURNING *'
        queryResults = await client.query(queryText, values)
    }

    console.log(`${newUser ? 'Signed up' : 'Logged In'} user: ${struser}, pass ${strpass}`)
    
    if (queryResults.rows[0]) {
        return response.status(200).json(
            {
                "lnguserid": queryResults.rows[0].lnguserid
            })
    }
})

const PORT = process.env.PORT || 3002

app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`)
})






