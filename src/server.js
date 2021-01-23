const { ApolloServer } = require("apollo-server");
const jwt = require("jsonwebtoken");
const typeDefs = require("./schema");
const resolvers = require("./resolver");
require("dotenv").config();
const { JWT_SECRET, PORT } = process.env;
const getUser = (token) => {
  try {
    if (token) {
      return jwt.verify(token, JWT_SECRET);
    }
    return null;
  } catch (error) {
    return null;
  }
};
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    const token = req.get("Authorization") || "";
    return { user: getUser(token.replace("Bearer", "")) };
  },
  introspection: true,
  playground: true,
});
server.listen(4000);
console.log("Running a GraphQL API server at `localhost:4000/graphql`");