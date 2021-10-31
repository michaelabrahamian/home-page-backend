import { RESTDataSource } from 'apollo-datasource-rest';
import { WEATHER_API_KEY } from '../config';

const OPEN_WEATHER_MAP_BASE_API_URL = 'http://api.openweathermap.org/data/2.5';

const UNIT = 'metric';
export class WeatherAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = OPEN_WEATHER_MAP_BASE_API_URL;
  }

  async getWeather({ location }: GetWeatherArgs): Promise<WeatherFormatted> {
    const response = await this.get('weather', {
      q: location,
      appid: WEATHER_API_KEY,
      units: UNIT,
    });

    return this.weatherReducer(response);
  }

  weatherReducer(weatherResponse: WeatherResponse): WeatherFormatted {
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

export type WeatherFormatted = {
  location: string;
  icon: string;
  shortDescription: string;
  longDescription: string;
  temperature: {
    average: number;
    min: number;
    max: number;
    feelsLike: number;
  };
  windSpeed: number;
  humidity: number;
};

type WeatherResponse = {
  coord: {
    lon: number;
    lat: number;
  };
  weather: [
    {
      id: number;
      main: string;
      description: string;
      icon: string;
    }
  ];
  base: string;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  };
  visibility: number;
  wind: {
    speed: number;
    deg: number;
    gust: number;
  };
  clouds: {
    all: number;
  };
  dt: number;
  sys: {
    type: number;
    id: number;
    country: string;
    sunrise: number;
    sunset: number;
  };
  timezone: number;
  id: number;
  name: string;
  cod: number;
};
