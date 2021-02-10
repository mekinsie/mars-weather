import MarsWeather from './../src/js/mars.js'

describe('MarsWeather', () => {
  test('Should correctly create a MarsWeather class, which contains a method that makes an API call.', () => {
    expect(MarsWeather.getWeather()).toEqual({})
  })
})  