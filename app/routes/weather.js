var express = require('express');
var router = express.Router(); 

let apiKey = '34d753ca8fe8fd4e7ccf04ee6f33e8ac';
let city = 'denver';
let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`



app.get('/weather', function (req, res) {
    res.render('footer', { weather: null, error: null });
})

app.post('/', function (req, res) {
    let city = req.body.city;
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`

    request(url, function (err, response, body) {
        if (err) {
            res.render('index', { weather: null, error: 'Error, please try again' });
        } else {
            let weather = JSON.parse(body)
            if (weather.main == undefined) {
                res.render('index', { weather: null, error: 'Error, please try again' });
            } else {
                let weatherText = `It's ${weather.main.temp} degrees in ${weather.name}!`;
                res.render('index', { weather: weatherText, error: null });
            }
        }
    });
})

module.exports = router;
