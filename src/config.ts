import dotenv from 'dotenv';

dotenv.config();

export const PORT = process.env.PORT || 4000;

export const WEATHER_API_KEY = process.env.OPEN_WEATHER_API_KEY;

export const ENV = {
  development: process.env.NODE_ENV === 'development',
  test: process.env.NODE_ENV === 'test',
  staging: process.env.NODE_ENV === 'staging',
  production: process.env.NODE_ENV === 'production',
};
