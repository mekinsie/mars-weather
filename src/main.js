import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import MarsWeather from './services/mars_service.js';
import RoverPhoto from './services/rover_photo_service.js';

const displayPressure = (weatherResponse) => {
  for (let i=0; i<=2; i++) {
    if( 'PRE' in weatherResponse.validity_checks[weatherResponse.sol_keys[i]] && weatherResponse.validity_checks[weatherResponse.sol_keys[i]].PRE.valid === true){    
      $('.showWeatherPressure').append(`<li> Insight Sol ${weatherResponse.sol_keys[i]}: ${weatherResponse[weatherResponse.sol_keys[i]].PRE.av} Pa. </li>`)
    } else {
      $('.showWeatherPressure').append(`Sorry, this data is not currently available`)
      }
    }
  }

const displayTemperature = (weatherResponse) => {
  for (let i=0; i<=2; i++) {
    if( 'AT' in weatherResponse.validity_checks[weatherResponse.sol_keys[i]] && weatherResponse.validity_checks[weatherResponse.sol_keys[i]].AT.valid === true) {
        $('.showWeatherTemperature').append(`<li> Insight Sol ${weatherResponse.sol_keys[i]}: ${weatherResponse[weatherResponse.sol_keys[i]].AT.av} degrees Fahrenheit. </li>`)
      } else {
        $('.showWeatherTemperature').append(`<li> Sorry, the data for Sol ${weatherResponse.sol_keys[i]} is not currently available </li>`)
      }
    }
  }

  const displayPhoto = (response) => {
  for (let i=0; i<=2; i++) {
  $('.rover-photo').append(`<img src=${response.photos[1].img_src}></img>`);
  $('.rover-photo').append(`<p> Curiosity Sol Day since landing: ${response.photos[0].sol} </p>`)
  }
}

const displayErrors = (error) => {
  $('.show-errors').text(`${error}`)
}
// async function makeApiCall() {
//   const response = await MarsWeather.getWeather();
//   console.log(response);
// }

$(document).ready(async function() {  
  MarsWeather.getWeather()
  .then(function(weatherResponse){
    if(weatherResponse instanceof Error) {
      throw Error(`NASA Weather API ${weatherResponse.message}`);
    }
    displayPressure(weatherResponse);
    displayTemperature(weatherResponse);
    return RoverPhoto.getPhoto(parseInt(weatherResponse.sol_keys[0]) + 2241);
    // console.log(parseInt(weatherResponse.sol_keys[0]) + 2241)
  })
  .then(function(imageResponse) {
    if (imageResponse instanceof Error) {
      throw Error(`NASA Image API ${imageResponse.message}`);
    }
    displayPhoto(imageResponse);
  })
  .catch(function(error) {
    displayErrors(error.message)
  })
  $('#pressure').on('click', function() {
    $('#pressure-readings').toggle();
  });
  $('#temperature').on('click', function() {
    $('#temperature-readings').toggle();
  });
  $('#photo').on('click', function () {
    $('.rover-photo').toggle();
  });
});