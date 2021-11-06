import { rest } from 'msw';
import {
  OPEN_WEATHER_MAP_BASE_API_URL,
  WEATHER_ENDPOINT,
} from '../../../datasources/weather';
import { DEFAULT_WEATHER_RESPONSE } from '../mocks/weather';

export const mockGetWeather = rest.get(
  `${OPEN_WEATHER_MAP_BASE_API_URL}/${WEATHER_ENDPOINT}`,
  (_, res, ctx) => res(ctx.json(DEFAULT_WEATHER_RESPONSE))
);
