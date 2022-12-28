const { GraphQLObjectType, GraphQLString, GraphQLID } = require("graphql");

const UserTypeMongo = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    gender: { type: GraphQLString },
    position: { type: GraphQLString },
  }),
});

module.exports = UserTypeMongo;
