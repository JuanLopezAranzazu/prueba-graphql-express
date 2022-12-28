const { config } = require("./config");
const port = config.port;

const express = require("express");
const app = express();

// graphql
const schema = require("./schemas/index");
const { graphqlHTTP } = require("express-graphql");

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    graphiql: true,
  })
);

app.listen(port, () => console.log(`Server running in port ${port}`));
