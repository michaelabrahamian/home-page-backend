import {
  GraphQLString,
  GraphQLInt,
  GraphQLObjectType,
  GraphQLSchema,
} from "graphql";

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    data: {
      type: GraphQLString,
      resolve: () => "Hello GraphQL!",
    },
  },
});

export const schema = new GraphQLSchema({
  query: RootQuery,
});
