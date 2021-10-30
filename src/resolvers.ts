export const resolvers = {
  Query: {
    weather: (_, { location }, { dataSources }) =>
      dataSources.weatherAPI.getWeather({ location }),
  },
};
