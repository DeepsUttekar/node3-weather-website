console.log('');
const path = require('path')
const express = require('express')
const hbs = require('hbs')
const forecast = require('./utils/forecast')
const geoCode = require('./utils/geocode')

const app = express();

//Define paths for express configs
const publicDir = path.join(__dirname, "../public")
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')


//Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static dir to serve
app.use(express.static(publicDir))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Deep'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About US',
        email: 'deeps.uttekar@gmail.com',
        name: 'Deep'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        message: "Please contact admin",
        name: 'Deep'
    })
})


app.get('/weather', (req, res) => {
    const address = req.query.address;
    if (!address) {
        return res.send({ error: 'You must provide address' })
    }

    geoCode.getGeoCode(address, (error, { lat, long, location } = {}) => {
        if (error) {
            return res.send({ error: error })

        }

        forecast.getForecast(lat, long, (error, forecastData) => {

            if (error) {
                return res.send({ error: error })
            }

            res.send({
                forecast: forecastData,
                location: location,
                address: req.query.address

            })
        })
    })

})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: "Search term is must"
        })
    }
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Deep',
        errorMessage: ' Help not found'
    })
})
app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Deep',
        errorMessage: 'Page not found'
    })
})
app.listen(3000, () => {
    console.log('Server is up on port 3000')
})