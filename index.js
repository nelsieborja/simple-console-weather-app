// Require "request" for making HTTP request
const request = require('request');
// Require "yargs" for exposing a flag in the console
const argv = require('yargs').argv;

// OpenWeatherMap key
const apiKey = '*****************************';
// Defining variable to hold city input
const city = argv.c || 'dubai';
// Generating the API URL to invoke
const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;

// Finally, making the request call
request(url, function(err, response, body) {
  // First checking for an error
  if (err) {
    // Displaying the error in the console
    console.log('error:', error);
    return;
  }

  // Parsing the body into a usable JavaScript object
  const weather = JSON.parse(body);
  // Generating the final response message
  const message = `It's ${weather.main.temp} degrees in ${weather.name}!`;
  // Responding with the final message
  console.log(message);
});
