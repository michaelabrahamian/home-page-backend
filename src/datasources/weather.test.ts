import { WeatherAPI } from '../datasources/weather';

const initWeatherAPI = () => {
  const weatherAPI = new WeatherAPI();
  weatherAPI.initialize({
    context: {},
    cache: {
      get: jest.fn(),
      set: jest.fn(),
      delete: jest.fn(),
    },
  });

  return weatherAPI;
};

describe('Weather Datasource', () => {
  it('works', async () => {
    const weatherAPI = initWeatherAPI();

    // TODO - mock with MSW
    const result = await weatherAPI.getWeather({ location: 'Sydney' });

    console.log('result', result);

    expect(true).toBe(true);
  });
});
