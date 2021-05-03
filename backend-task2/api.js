const express = require('express')
const mongoose = require('mongoose')
const port = 5000

const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static('public'))



app.listen(port, () => console.log(`Server started at http://localhost:${port}`))
