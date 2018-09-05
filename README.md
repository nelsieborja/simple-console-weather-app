# Console Weather App with Node.js

## Requirements

- [OpenWeatherMap.org](https://home.openweathermap.org/api_keys) free account
- **Node.js**

## NPM modules used

- [request](https://www.npmjs.com/package/request) - to make an http request in node
- [yargs](https://www.npmjs.com/package/yargs) - to be able to define variables from the command line

## How it's built

- Create _OpenWeatherMap_ free acount. Once signed in go to API keys tab to generate a key.
- Create an empty directory (eg: _node-weather_) and run `npm init` to start initializing the project. Fill out the required information as prompted.
- Create a new file (eg: _index.js_) which will contain the code.
- Make an API call request to _OpenWeatherMap_ URL with required parameters **q** (city) and **appid** (API key). But first make sure to install _request_ with `npm install request --save`. The code should looks like:

  ```
  const request = require('request');

  const apiKey = '*****************************';
  const city = 'dubai';
  const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

  request(url, function (err, response, body) {
    if (err) {
      console.log('error:', error);
    } else {
      console.log('body:', body);
    }
  });
  ```

- Running `node index.js` in the console would give:

  `body: {"coord":{"lon":-122.67,"lat":45.52},"weather":[{"id":800,"main":"Clear","description":"clear sky","icon":"01n"}],"base":"stations","main":{"temp":54.82,"pressure":1019,"humidity":71,"temp_min":53.06,"temp_max":57.02},"visibility":16093,"wind":{"speed":1.03,"deg":222},"clouds":{"all":1},"dt":1535881980,"sys":{"type":1,"id":2274,"message":0.0026,"country":"US","sunrise":1535895238,"sunset":1535942726},"id":5746545,"name":"dubai","cod":200}`

- To make the response more readable and be able to access the target values easily, `JSON.parse()` can be used to convert the response into JSON Object:
  ```
  const weather = JSON.parse(body);
  const message = `It's ${weather.main.temp} degrees in ${weather.name}!`;
  console.log(message);
  ```
- Running the same command would now give:

  ```
  It's 104.86 degrees in Dubai!
  ```

- _OpenWeatherMap_ has set the temperature to _Kelvin_ by default, to change it to _Fahrenheit_ pass in a new parameter `units=imperial`

- The App is almost done except it will always gives temperature for one specific city which is dubai. To make the city dynamic install **yargs** with `npm install yargs --save`

- Exposing a flag of `c` for city in the console:

  ```
  const argv = require('yargs').argv;

  // variable city will holds the input value, with dubai as default in case of empty
  const city = argv.c || 'dubai';
  ```

- Running again this time passing the variable with `-c` using any city name: `node index.js -c sydney`

  ```
  It's 59.81 degrees in Sydney!
  ```

* The final code should now looks like:

  ```
  const request = require('request');
  const argv = require('yargs').argv;

  const apiKey = '*****************************';
  const city = argv.c || 'dubai';
  const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;

  request(url, function(err, response, body) {
    if (err) {
      console.log('error:', error);
      return;
    }

    const weather = JSON.parse(body);
    const message = `It's ${weather.main.temp} degrees in ${weather.name}!`;
    console.log(message);
  });
  ```
