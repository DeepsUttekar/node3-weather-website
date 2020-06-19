const request = require('postman-request')
const getForecast = (lat, long, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=8bc8eec0bf220f991e85f7ddffa7f1db&query=' + lat + "," + long
    request({ url, json: true }, (reqError, response, { error, current }) => {

        if (reqError) {
            callback('Unable to connect to location Service', undefined);
        } else if (error) {
            callback('Unable to location', undefined);
        } else {
            callback(undefined, current.weather_descriptions + ". It is currently " + current.temperature + " degrees out. Feels like " + current.feelslike);

        }
    })
}

module.exports = {
    getForecast: getForecast
}