import { WeatherAPI } from '../datasources/weather';
import { WeatherResponse, WeatherFormatted } from '../types/weather';
import { initDataSource } from '../test-utils/datasource-utils';

const initWeatherAPI = () => initDataSource(new WeatherAPI());

describe('Weather datasource', () => {
  it('reduces a response payload correctly', () => {
    const weatherAPI = initWeatherAPI();

    const response: WeatherResponse = {
      weather: [
        {
          id: 800,
          main: 'Stormy',
          description: 'thunderstorms',
          icon: '04a',
        },
      ],
      main: {
        temp: 185.21,
        feels_like: 210.59,
        temp_min: 221.24,
        temp_max: 164.52,
        pressure: 1204,
        humidity: 92,
      },
      wind: {
        speed: 4.52,
        deg: 65,
        gust: 5.34,
      },
      name: 'Perth',
    };

    const expectedParsedWeather: WeatherFormatted = {
      humidity: 92,
      icon: '04a',
      location: 'Perth',
      longDescription: 'thunderstorms',
      shortDescription: 'Stormy',
      temperature: {
        average: 185.21,
        feelsLike: 210.59,
        max: 164.52,
        min: 221.24,
      },
      windSpeed: 4.52,
    };

    const result = weatherAPI.reduceWeather(response);

    expect(result).toEqual(expectedParsedWeather);
  });

  it('fetches and reduces a weather response', async () => {
    const weatherAPI = initWeatherAPI();

    const result = await weatherAPI.getWeather({ location: 'Sydney' });

    const expectedResult = {
      humidity: 84,
      icon: '01d',
      location: 'Sydney',
      longDescription: 'clear sky',
      shortDescription: 'Clear',
      temperature: {
        average: 291.96,
        feelsLike: 292.09,
        max: 294.32,
        min: 289.68,
      },
      windSpeed: 2.24,
    };

    expect(result).toEqual(expectedResult);
  });
});
