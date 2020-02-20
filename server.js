require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const fetch = require('isomorphic-fetch')

const app = express()
const port = 3000

app.use(express.static('public'))
app.use(bodyParser.json())

const handleSend = (request, response) => {
    const secretKey = process.env.SECRET_KEY
    const token = request.body.token
    const verifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${token}`

    fetch(verifyUrl, {
        method: 'POST'
    })
    .then(res => res.json())
    .then(googleResponse => response.json({ googleResponse }))
    .catch(error => response.json({ error }))
}

app.post('/send', handleSend)

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})