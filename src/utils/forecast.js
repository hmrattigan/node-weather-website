const request = require('postman-request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.openweathermap.org/data/2.5/weather?lat=' + latitude + '&lon=' + longitude + '&appid=a9ce7b12f9430e6dfb368ba187a625cb&units=imperial'

    request ({ url, json:true}, (error, { body }) => {
        if (error) {
            callback('Could not connect to Co-ordinates', undefined)
        } else if (body.error) {
            // This callback below doesn't work. Should look in more detail at what happens in the response body if I put an incorrect latitude in the URL for example.
            callback('No results for co-ordinates', undefined)
        } else {
            callback(undefined, `Today there will be ${body.weather[0].main}. The temperature is ${body.main.temp} degrees. It feels like ${body.main.feels_like} degrees.`)
        }
    })
}

module.exports = forecast