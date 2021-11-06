import { RESTDataSource } from 'apollo-datasource-rest';
import { WEATHER_API_KEY } from '../config';
import { WeatherFormatted, WeatherResponse } from '../types/weather';

export const OPEN_WEATHER_MAP_BASE_API_URL =
  'http://api.openweathermap.org/data/2.5';

export const WEATHER_ENDPOINT = 'weather';

const UNIT = 'metric';

export class WeatherAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = OPEN_WEATHER_MAP_BASE_API_URL;
  }

  async getWeather({ location }: GetWeatherArgs): Promise<WeatherFormatted> {
    const response: WeatherResponse = await this.get(WEATHER_ENDPOINT, {
      q: location,
      appid: WEATHER_API_KEY,
      units: UNIT,
    });

    return this.reduceWeather(response);
  }

  reduceWeather(weatherResponse: WeatherResponse): WeatherFormatted {
    return {
      location: weatherResponse.name,
      icon: weatherResponse.weather[0]?.icon,
      shortDescription: weatherResponse.weather[0]?.main ?? '',
      longDescription: weatherResponse.weather[0]?.description ?? '',
      temperature: {
        average: weatherResponse.main.temp,
        min: weatherResponse.main.temp_min,
        max: weatherResponse.main.temp_max,
        feelsLike: weatherResponse.main.feels_like,
      },
      windSpeed: weatherResponse.wind.speed,
      humidity: weatherResponse.main.humidity,
    };
  }
}

export type GetWeatherArgs = {
  location: string;
};
