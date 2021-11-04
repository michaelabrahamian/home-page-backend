import { Context as ApolloContext } from 'apollo-server-core';
import type { IResolvers } from '@graphql-tools/utils';

import {
  GetWeatherArgs,
  WeatherAPI,
} from './datasources/weather';
import { WeatherFormatted } from './types/weather';

type Context = ApolloContext<{ dataSources: { weatherAPI: WeatherAPI } }>;

export const resolvers: IResolvers = {
  Query: {
    weather: (
      _: unknown,
      { location }: GetWeatherArgs,
      { dataSources }: Context
    ): Promise<WeatherFormatted> =>
      dataSources.weatherAPI.getWeather({ location }),
  },
};
