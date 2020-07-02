const request = require('request');

const forecast = (longitude, latitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=52e122324f9b2d8965bd978ebcd63635&query=' + encodeURIComponent(longitude) + encodeURIComponent(',') + encodeURIComponent(latitude) + '&units=m';

    request({url, json: true}, (err, {body}) => {
        if(err) {
            callback('Some error occured', undefined);
        } else if(body.error) {
            callback('Location Coordinates not found', undefined);
        } else {
            callback(undefined, {
                temperature: body.current.temperature,
                precipitation: body.current.precip,
                weather_desc: body.current.weather_descriptions,
                feels_like: body.current.feelslike
            })
        }
    })
}

module.exports = forecast