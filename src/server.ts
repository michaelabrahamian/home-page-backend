import { ApolloServer, gql } from 'apollo-server';
import { typeDefs } from './schema';
import { resolvers } from './resolvers';
import { SERVER_PORT } from './config';
import { WeatherAPI } from './datasources/weather';
import { NewsAPI } from './datasources/news';

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
    weatherAPI: new WeatherAPI(),
    newsAPI: new NewsAPI(),
  }),
});

server
  .listen({
    port: SERVER_PORT,
  })
  .then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
  });
