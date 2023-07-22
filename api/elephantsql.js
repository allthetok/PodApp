require('dotenv').config()
const express = require('express')
const cors = require('cors')
const app = express()
const pg = require('pg')
const bcrypt = require('bcrypt')

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
    let values, queryResults, queryText

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
        queryResults = await client.query('SELECT strpass FROM tblUser WHERE struser = $1', [struser])
        await bcrypt.compare(strpass, queryResults.rows[0].strpass)
        values = [struser, queryResults.rows[0].strpass]
        await client.query('UPDATE tblUser SET dtmlastlogin = NOW() WHERE struser = $1 AND strpass = $2;', values)
        queryText = 'SELECT * from tblUser WHERE struser = $1 AND strpass = $2'
        queryResults = await client.query(queryText, values)
    }
    else {
        const hash = await bcrypt.hash(strpass, 10)
        values = [struser, hash]
        queryText = 'INSERT INTO tblUser(struser, strpass, dtmcreated, dtmlastlogin) VALUES($1, $2, NOW(), NOW()) RETURNING *'
        queryResults = await client.query(queryText, values)
    }

    console.log(`${newUser ? 'Signed up' : 'Logged In'} user: ${struser}.`)
    
    if (queryResults.rows[0]) {
        return response.status(200).json(
            {
                "lnguserid": queryResults.rows[0].lnguserid
            })
    }
})

// app.post('/api/likes', async (request, response) => {
//     const queryResults = await client.query('CREATE TABLE tblLikes(lngLikeId serial PRIMARY KEY, strpodchaserId VARCHAR (50) NOT NULL, strtitle VARCHAR (50) NOT NULL, strname VARCHAR (50) NOT NULL, strweburl VARCHAR (50) NOT NULL, strimageurl VARCHAR (50) NOT NULL, dtmLiked TIMESTAMP NOT NULL, strlatestEpisodeDate VARCHAR (50), lngUserId serial NOT NULL,FOREIGN KEY (lngUserId) REFERENCES tblUser(lngUserId));')
//     if (queryResults) {
//         console.log(queryResults)
//         return response.status(200).json(queryResults)
//     }
// })

app.post('/api/likePod', async (request, response) => {
    const body = request.body
    const strpodchaserid = body.strpodchaserid
    const strtitle = body.strtitle
    const strname = body.strname
    const strweburl = body.strweburl
    const strimageurl = body.strimageurl
    const strlatestepisodedate = body.strlatestepisodedate
    const lnguserid = body.lnguserid
    const values = [strpodchaserid, strtitle, strname, strweburl, strimageurl, strlatestepisodedate, lnguserid]
    const queryText = 'INSERT INTO tblLikes(strpodchaserId, strtitle, strname, strweburl, strimageurl, dtmLiked, strlatestEpisodeDate, lngUserId) VALUES($1, $2, $3, $4, $5, NOW(), $6, $7) RETURNING *'
    let queryResults

    if (!strpodchaserid || !strtitle || !strname || !strweburl || !strimageurl || !strlatestepisodedate || !lnguserid) {
        return response.status(400).json({
            error: 'PodchaserId, Title, Author Name, Web Url, Image Url, Latest Episode Date or UserId missing'
        })
    }
    queryResults = await client.query(queryText, values)

    console.log(`${strtitle} liked by ${lnguserid}`)

    if (queryResults.rows[0]) {
        return response.status(200).json({
            "strtitle": queryResults.rows[0].strtitle,
            "strpodchaserid": queryResults.rows[0].strpodchaserid,
            "lnguserid": queryResults.rows[0].lnguserid
        })
    }
})

app.post('/api/likeEp', async (request, response) => {
    const body = request.body
    const strpodchaserid = body.strpodchaserid
    const strepisodeid = body.strepisodeid
    const strtitle = body.strtitle
    const strweburl = body.strweburl
    const strimageurl = body.strimageurl
    const intlength = body.intlength
    const strairdate = body.strairdate
    const lnguserid = body.lnguserid
    const values = [strpodchaserid, strepisodeid, strtitle, strweburl, strimageurl, intlength, strairdate, lnguserid]
    const queryText = 'INSERT INTO tblLikesEpisode(strpodchaserid, strepisodeid, strtitle, strweburl, strimageurl, intlength, strairdate, dtmLiked, lnguserid) VALUES($1, $2, $3, $4, $5, $6, $7, NOW(), $8) RETURNING *'
    let queryResults

    if (!strpodchaserid || !strepisodeid || !strtitle || !strweburl || !strairdate || !lnguserid) {
        return response.status(400).json({
            error: 'PodchaserId, Episode Id, Title, Web Url, Air Date or UserId missing'
        })
    }

    queryResults = await client.query(queryText, values)

    console.log(`${strepisodeid} liked by ${lnguserid}`)

    if (queryResults.rows[0]) {
        return response.status(200).json({
            "strtitle": queryResults.rows[0].strtitle,
            "strpodchaserid": queryResults.rows[0].strpodchaserid,
            "strepisodeid": queryResults.rows[0].strepisodeid,
            "lnguserid": queryResults.rows[0].lnguserid
        })
    }
})

app.post('/api/like', async (request, response) => {
    const body = request.body
    const lnguserid = body.lnguserid
    const strpodchaserid = body.strpodchaserid
    const values = [lnguserid, strpodchaserid]
    let queryText, queryResults

    if (!lnguserid || !strpodchaserid) {
        return response.status(400).json({
            error: 'No user id or PodchaserId specified'
        })
    }

    queryText = 'SELECT 1 WHERE EXISTS (SELECT * FROM tblLikes WHERE lnguserid = $1 AND strpodchaserid = $2)'
    queryResults = await client.query(queryText, values)

    if (!queryResults.rows[0]) {
        return response.status(200).json({
            blnLiked: false
        })
    }
    else {
        return response.status(200).json({
            blnLiked: true
        })
    }

})

app.post('/api/likes', async (request, response) => {
    const body = request.body
    const lnguserid = body.lnguserid
    const values = [lnguserid]
    let queryText, queryResults

    if (!lnguserid) {
        return response.status(400).json({
            error: 'No user id specified'
        })
    }

    queryText = 'SELECT 1 WHERE EXISTS (SELECT * FROM tblLikes WHERE lnguserid = $1)'
    queryResults = await client.query(queryText, values)

    if (!queryResults.rows[0]) {
        return response.status(400).json({
            error: `User with id ${lnguserid} has not liked any podcasts`
        })
    }

    queryText = 'SELECT * from tblLikes WHERE lnguserid = $1 ORDER BY dtmLiked DESC'
    queryResults = await client.query(queryText, values)
    return response.status(200).json(queryResults.rows)
})

app.delete('/api/like', async (request, response) => {
    const body = request.body
    const lnguserid = body.lnguserid
    const strpodchaserid = body.strpodchaserid
    const values = [lnguserid, strpodchaserid]
    let queryText, queryResults

    if (!lnguserid || !strpodchaserid) {
        return response.status(400).json({
            error: 'No user id or podchaser id specified'
        })
    }

    queryText = 'DELETE FROM tblLikes WHERE lnguserid = $1 AND strpodchaserid = $2'
    queryResults = await client.query(queryText, values)

    if (queryResults.rowCount === 0) {
        return response.status(404).json({
            error: `User id of ${lnguserid} has not liked podcast with podchaser id ${strpodchaserid}`
        })
    }

    // else if (queryResults.rowCount !== 0) {
    //     return response.status(200).json({
    //         "lnguserid": lnguserid,
    //         "strpodchaserid": strpodchaserid,
    //         "deleteSuccessful": true
    //     })
    // }
    else if (queryResults.rowCount !== 0) {
        return response.sendStatus(204)
    }

})

const PORT = process.env.PORT || 3002

app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`)
})






