import express from "express";
import { graphqlHTTP } from "express-graphql";
import { schema } from "./schema";
import { PORT } from "./config";

const app = express();

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
