const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')
const path = require('path');
const hbs = require('hbs');
app.listen(port, () => { console.log('server up in'+ port); });
app.use(express.static(path.join(__dirname, '../public')));
app.set('views', path.join(__dirname, '../templates/views'));
app.set('view engine', 'hbs');
hbs.registerPartials(path.join(__dirname, '../templates/partials'));


app.get('/weather', (req, res) =>{
    if (!req.query.address){
        return res.send({
            error: 'Please provide an address.'
        });
    }
    geocode(req.query.address, (error, {latitude, longitude, location} = {}) =>{
        if (error) {
            return res.send({error});
        }
        forecast(latitude, longitude, (error, forecastData)=>{
           if (error){
               return res.send({error})
           }
           res.send({
               forecast: forecastData,
               location: location,
               address: req.query.address
           });
        });
    });
});

app.get('/products', (req, res) =>{
    if (!req.query.search){
        return res.send({
           error: 'Sie mussen ein search schrieben'
        });
    }
    res.send({
        products: []
    });
});

app.get('', (reg, res) =>{
    res.render('index', {
        title: 'WeatherSci'
    });
});

app.get('/about', (reg, res) =>{
    res.render('about', {
        title: 'about me'
    });
});

app.get('/help', (reg, res) =>{
    res.render('help', {
        title: 'help me'
    });
});

app.get('/help/*', (reg, res) =>{
    res.render('404', {
        errorMessage: 'Helper page Not Found, you so stupid!!!',
        title: '404'
    });
});

app.get('*', (reg, res) =>{
    res.render('404', {
        errorMessage: 'Page Not Found, you so stupid!!!',
        title: '404'
    });
});
