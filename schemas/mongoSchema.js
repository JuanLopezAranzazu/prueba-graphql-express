const {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
  GraphQLList,
} = require("graphql");
// models
const User = require("./../models/userModel");
// types
const UserTypeMongo = require("./typeDefs/userTypeMongo");

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    getAllUsers: {
      type: new GraphQLList(UserTypeMongo),
      async resolve(parent, args) {
        const users = await User.find({});
        return users;
      },
    },
    getUserByName: {
      type: UserTypeMongo,
      args: { name: { type: GraphQLString } },
      async resolve(parent, args) {
        const user = await User.findOne({ name: args.name });
        return user;
      },
    },
  },
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    createUser: {
      type: UserTypeMongo,
      args: {
        name: { type: GraphQLString },
        gender: { type: GraphQLString },
        position: { type: GraphQLString },
      },
      async resolve(parent, args) {
        const user = new User({
          name: args.name,
          gender: args.gender,
          position: args.position,
        });

        await user.save();
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
