import { gql } from 'apollo-server';

export const typeDefs = gql`
  type Temperature {
    average: Float
    min: Float
    max: Float
    feelsLike: Float
  }

  type Weather {
    location: String
    icon: String
    shortDescription: String
    longDescription: String
    temperature: Temperature
    windSpeed: Float
    humidity: Int
  }

  type Query {
    weather(location: String): Weather
  }
`;
