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

export type WeatherResponse = {
  coord?: {
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
  base?: string;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  };
  visibility?: number;
  wind: {
    speed: number;
    deg: number;
    gust: number;
  };
  clouds?: {
    all: number;
  };
  dt?: number;
  sys?: {
    type: number;
    id: number;
    country: string;
    sunrise: number;
    sunset: number;
  };
  timezone?: number;
  id?: number;
  name: string;
  cod?: number;
};