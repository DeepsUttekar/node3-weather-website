const request = require('postman-request')
const getGeoCode = (address, callback) => {
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) + ".json?access_token=pk.eyJ1IjoiZGVlcHMtdXR0ZWthciIsImEiOiJja2JhbXBqZWowa29mMnRxcXB3ZXltN2V1In0.8uxtBexa91tjS08P8L2h7A"

    request({  url, json: true }, (reqError, response, {features}={}) => {

        if (reqError) {
            callback('Unable to connect to location Service', undefined);
        } else if (features.length === 0) {
            callback('Wrong location', undefined);
        } else {
            const long = features[0].center[0]
            const lat = features[0].center[1]
            callback(undefined, { lat: lat, long: long, location: features[0].place_name });
        }
    })
}

module.exports = {
    getGeoCode: getGeoCode
}