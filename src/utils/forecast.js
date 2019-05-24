const request = require('request');

const forecast = (latitude, longitude, callback) =>{
    const url = 'https://api.darksky.net/forecast/39daf30333f85349c01442b7a2961cd0/' + latitude + ',' + longitude;
        request({url:url, json:true}, (error, {body})=>{
            if (error){
                callback('!!Error!!', undefined);
            } else if(body.error){
                callback('Unable to find location.', undefined);
            } else {
                callback(undefined, `${body.daily.data[0].summary} the temperature is currently ${body.currently.temperature}`);
            }
        });
};


module.exports = forecast;