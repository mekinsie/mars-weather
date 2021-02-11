import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import MarsWeather from './js/mars.js';
import RoverPhoto from './js/rover_photos.js';

const checkPreValidity = (response) => {
  for (let i=0; i<=2; i++) {
    if( 'PRE' in response.validity_checks[response.sol_keys[i]] && response.validity_checks[response.sol_keys[i]].PRE.valid === true){    
      $('.showWeatherPressure').append(`<li> Sol ${response.sol_keys[i]}: ${response[response.sol_keys[i]].PRE.av} Pa. </li>`)
    } else {
      $('.showWeatherPressure').append(`Sorry, this data is not currently available`)
      }
    }
  }

const checkAtValidity = (response) => {
  for (let i=0; i<=2; i++) {
    if( 'AT' in response.validity_checks[response.sol_keys[i]] && response.validity_checks[response.sol_keys[i]].AT.valid === true) {
        $('.showWeatherTemperature').append(`<li> Sol ${response.sol_keys[i]}: ${response[response.sol_keys[i]].AT.av} degrees Fahrenheit. </li>`)
      } else {
        $('.showWeatherTemperature').append(`<li> Sorry, the data for Sol ${response.sol_keys[i]} is not currently available </li>`)
      }
    }
  }

async function makeApiCall() {
  const response = await MarsWeather.getWeather();
  console.log(response);
  checkPreValidity(response);
  checkAtValidity(response);
}

$(document).ready(function() {
  makeApiCall();
  $('#pressure').on('click', function() {
    $('#pressure-readings').toggle();
  });
  $('#temperature').on('click', function() {
    $('#temperature-readings').toggle();
  });
  $('#photo').on('click', async function () {
    const roverResponse = await RoverPhoto.getPhoto();
    $('.rover-photo').append(`<img src=${roverResponse.photos[1].img_src}></img>`);
  })
});
