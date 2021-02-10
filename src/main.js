import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import MarsWeather from './js/mars.js'

const checkPreValidity = (response) => {
  if(response.validity_checks[response.sol_keys[0]].PRE.valid === true){
  $('.showWeatherPressure').append(`<li> The average pressure on Mars for sol day ${response.sol_keys[0]}  is ${response[response.sol_keys[0]].PRE.av} Pa. </li>`)
  $('.showWeatherPressure').append(`<li> The average pressure on Mars for sol day ${response.sol_keys[1]}  is ${response[response.sol_keys[1]].PRE.av} Pa. </li>`)
  $('.showWeatherPressure').append(`<li>The average pressure on Mars for sol day ${response.sol_keys[2]}  is ${response[response.sol_keys[2]].PRE.av} Pa. </li>`)
  } else {
    $('.showWeatherPressure').append(`Sorry, this data is not currently available`)
  }
}

const checkAtValidity = (response) => {
  if(response.validity_checks[782].AT.valid === true) {
  $('.showWeatherTemperature').append(`<li> The average temperture on Mars for sol day ${response.sol_keys[0]}  is ${response[response.sol_keys[0]].AT.av} degrees Celcius. </li>`)
  $('.showWeatherTemperture').append(`<li> The average temperature on Mars for sol day ${response.sol_keys[1]}  is ${response[response.sol_keys[1]].AT.av} degrees Celcius. </li>`)
  $('.showWeatherTemperture').append(`<li>The average temperature on Mars for sol day ${response.sol_keys[2]}  is ${response[response.sol_keys[2]].AT.av} degrees Celcius. </li>`)
  } else {
    $('.showWeatherTemperature').append(`Sorry, this data is not currently available`)
  }
}

function clearFields() {
  $('.showWeather').val("");
  $('.showErrors').val("");
}

// function getElements(response) {
//   if (response) {
//   } else {
//     $('.showErrors').text(`There was an error: ${response}`);
//   }
// }

async function makeApiCall() {
  const response = await MarsWeather.getWeather();
  console.log(response);
  checkPreValidity(response);
  checkAtValidity(response);
}

$(document).ready(function() {
  $('#weather').on('click', function() {
    $('#pressure-readings').show();
    $('#temperature-readings').show();
    clearFields();
    makeApiCall();
  });
});
