import { Context as ApolloContext } from 'apollo-server-core';
import type { IResolvers } from '@graphql-tools/utils';

import { GetWeatherArgs, WeatherAPI } from './datasources/weather';
import { WeatherFormatted } from './types/weather';
import { GetNewsContentArgs, NewsAPI } from './datasources/news';
import { NewsContentFormatted } from './types/news';

type DataSources = {
  weatherAPI: WeatherAPI;
  newsAPI: NewsAPI;
};

type Context = ApolloContext<{ dataSources: DataSources }>;

export const resolvers: IResolvers = {
  Query: {
    weather: (
      _: unknown,
      { location }: GetWeatherArgs,
      { dataSources: { weatherAPI } }: Context
    ): Promise<WeatherFormatted> => weatherAPI.getWeather({ location }),
    news: (
      _: unknown,
      { query }: GetNewsContentArgs,
      { dataSources: { newsAPI } }: Context
    ): Promise<NewsContentFormatted> => newsAPI.getNewsContent({ query }),
  },
};
