const request = require('request');

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1Ijoia2FyYW5jaHVnaCIsImEiOiJja2MzaWIwZ2kxdXJ2MnNuNHdlM2luODgwIn0.AiBindTd7kOuJvABBJ3wHQ&limit=1';
    request({url, json: true}, (err, {body}) => {
    if(err) {
            callback('Unable to connect to the service', undefined);
    } else if(body.features.length === 0){
            callback('No such location found', undefined);
    } else {
       callback(undefined, {
           latitude: body.features[0].center[1],
           longitude: body.features[0].center[0],
           place_name: body.features[0].place_name
       });
    }
    })
}

module.exports = geocode
