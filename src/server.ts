import { ApolloServer, gql } from 'apollo-server';
import { typeDefs } from './schema';
import { WeatherAPI } from './datasources/weather';
import { resolvers } from './resolvers';

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
    weatherAPI: new WeatherAPI(),
  }),
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
