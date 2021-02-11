export default class RoverPhoto {
  static async getPhoto() {
    try {
      const response = await fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=100&api_key=${process.env.API_KEY}`)

      
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response.json(); 
    } catch(error) {
      return error.message;
    }
  }  
}