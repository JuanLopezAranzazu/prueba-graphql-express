const {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLInt,
  GraphQLString,
  GraphQLList,
} = require("graphql");
// types
const UserType = require("./typeDefs/userType");
// data
const users = [{ id: 1, name: "test", gender: "female" }];

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    getAllUsers: {
      type: new GraphQLList(UserType),
      resolve(parent, args) {
        return users;
      },
    },
    getUserById: {
      type: UserType,
      args: { id: { type: GraphQLInt } },
      resolve(parent, args) {
        return users.find((item) => item.id === args.id);
      },
    },
  },
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    createUser: {
      type: UserType,
      args: {
        name: { type: GraphQLString },
        gender: { type: GraphQLString },
      },
      resolve(parent, args) {
        users.push({
          id: Math.max(...users.map((item) => item.id)) + 1,
          name: args.name,
          gender: args.gender,
        });
        return args;
      },
    },
  },
});

const schema = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});

module.exports = schema;
