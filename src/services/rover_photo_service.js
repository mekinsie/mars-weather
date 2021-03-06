export default class RoverPhoto {
  static getPhoto(date) {
    return fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=${date}&api_key=${process.env.API_KEY}`)
      .then(function(response){
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response.json(); 
    })
    .catch(function(error) {
      return Error(error);
    })
  }
}

