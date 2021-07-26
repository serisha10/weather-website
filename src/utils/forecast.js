const request = require( 'postman-request' );

const forecast = ( latitude, longitude, callback ) => {
    const url = 'http://api.weatherstack.com/current?access_key=7af04afba785ac51b4aa6760eb5efd3a&query=' + latitude + ',' + longitude;
    request( { url, json: true }, ( error, {body}) => {
        if ( error ) {
            callback( 'Unable to connect to the weather service!' );
        } else if ( body.error ) {
            callback( 'Unable to find the location!' );
        } else {
            callback( undefined, 'It is currently ' + body.current.temperature + ' degree celsius. Weather condition is ' + body.current.weather_descriptions +'.')
        }
    })   
}

module.exports = forecast;