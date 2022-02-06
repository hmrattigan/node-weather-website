const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require ('./utils/geocode')
const forecast = require('./utils/forecast.js')

const app = express()
const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Set up handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Set up static directory to serve
app.use(express.static(publicDirectoryPath))


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Helen Rattigan'
    })
})

app.get('/about', (req,res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Bettina the Bot'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Do you need help?',
        message: 'I really hope you find what you are looking for!',
        name: 'Helen Rattigan'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'Address must be provided'
        })
    }
    
    geocode(req.query.address, (error, {latitude, longitude, location} = {}) =>{
        if (error) {
            res.send({error})
        }

        forecast(latitude, longitude, (error, forecastData) =>{
            if (error) {
                res.send({error})
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            }) 
        })
    })   
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
        res.render('404', {
        title: '404 Page',
        errorMessage: 'Help article not found.',
        name: 'Helen Rattigan'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404 Page',
        errorMessage: 'Page not found.',
        name: 'Helen Rattigan'
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})