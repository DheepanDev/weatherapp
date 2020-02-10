//for specifically accessing the path allocated acc to usr req
//the server init
//handlebars
//stores the values of express npm
const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

//paths for expres config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//static directory to serve when requested
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'weather app',
        name: 'dheep'
    })
})
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'about',
        name: 'rajni'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'help me buddy',
        name: 'dheepan'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'enter an address'
        })
    }

    geocode(req.query.address, (error, { lat, long, loca } ={}) => {
        if (error) {
            return res.send({ error })
        }

        forecast(lat, long, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }

            res.send({
                forecast: forecastData,
                loca,
                address: req.query.address

            })
        })
    })


})



app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'provide a SEARCH term!'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })

})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404 file not found',
        name: 'dheep',
        errorMessage: 'req file or page not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404 Page not found',
        name: 'created by dheep',
        errorMessage: 'Page not found'
    })
})

app.listen(port, () => {
    console.log('server on port' + port)
})