const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const bodyParser = require('body-parser')

const pages = require('./routes/pages')
const series = require('./routes/series')

const app = express()
const port = process.env.PORT || 3000
const mongo = process.env.MONGODB || 'mongodb://localhost/minhas-series'
mongoose.Promise = global.Promise

//process request body
app.use(bodyParser.urlencoded({ extended: true }))

//assets
app.use(express.static('public'))

//view engine - ejs
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use('/', pages)
app.use('/series', series)

mongoose
    .connect(mongo, { useNewUrlParser: true })
    .then(() => {
        app.listen(port, () => {
            console.log(`server running on port: ${port}`)
        })
    })
    .catch(e => {
        console.log(e)
    }) 