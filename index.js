const { config } = require("./config");
const port = config.port;

const express = require("express");
const app = express();
app.use(express.json());
require("./mongo");

// graphql
// const schema = require("./schemas/index");
const schemaMongo = require("./schemas/mongoSchema");
const { graphqlHTTP } = require("express-graphql");

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schemaMongo,
    graphiql: true,
  })
);

app.listen(port, () => console.log(`Server running in port ${port}`));
