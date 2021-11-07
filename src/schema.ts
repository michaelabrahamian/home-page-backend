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

  type NewsItem {
    id: String
    title: String
    url: String
    publicationDate: String
    category: String
  }

  type News {
    results: [NewsItem]
  }

  type Query {
    weather(location: String): Weather
    news(query: String): News
  }
`;
