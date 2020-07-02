const path = require('path')
const express = require('express')
const hbs = require('hbs');
const geocode = require('./geocode');
const forecast = require('./forecast');

const app = express();

//paths for express config
const publicDirectoryPath = path.join(__dirname, '../public');
const templatePath = path.join(__dirname, '../template/views');
const partialsPath = path.join(__dirname, '../template/partials');

//setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', templatePath);
hbs.registerPartials(partialsPath);

// setting up static directory
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Karan Chugh'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Karan Chugh'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text.',
        name: 'Karan Chugh'
    })
})

app.get('/help/*', (req, res) => {
    res.render('notFound', {
        message: 'This help article does not exist'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'Address not found'
        })
    } else {
        geocode(req.query.address, (error, {latitude, longitude, place_name} = {}) => {
            if(error)
            {
                return res.send(error);
            }
            forecast(latitude, longitude, (error, forecastData) => {
                if(error)
                {
                    return res.send(error);
                } else {
                    return res.send({
                        forecastData,
                        place_name
                    })
                }
            })
        })
    }
})

app.get('/products', (req, res) => {
    if(!req.query.search) {
        return res.send({
            error: 'Please provide a search term'
        })
    }
    res.send({
        products: []
    })
})

app.get('*', (req, res) => {
    res.render('notFound', {
        message: 'Page 404 Error'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})