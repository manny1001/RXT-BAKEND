require("dotenv").config();
const cors = require("cors");
const express = require("express");
const { ApolloServer, AuthenticationError } = require("apollo-server");
const jwt = require("jsonwebtoken");
const typeDefs = require("./schema");
const resolvers = require("./resolvers");
const UserController = require("./controllers/user");
const DriverController = require("./controllers/driver");

const app = express();
app.use(cors());

const { JWT_SECRET, RDS_PORT, PORT } = process.env;

const getUserFromToken = (token) =>
  new Promise((resolve, reject) => {
    jwt.verify(token, JWT_SECRET, async (err, tokenPayload) => {
      console.log(token);

      if (err) {
        return reject(err);
      }
      console.log(tokenPayload);

      if (tokenPayload && tokenPayload.type === "driver") {
        const driver = await DriverController.getDriverById(tokenPayload.id);
        resolve(driver);
      }
      if (tokenPayload && tokenPayload.type === "user") {
        const user = await UserController.getUserById(tokenPayload.id);
        resolve(user);
      }
      if (tokenPayload && !tokenPayload.type) {
        const user = await UserController.getUserById(tokenPayload.id);
        resolve(user);
      }
    });
  });

const server = new ApolloServer({
  introspection: true,
  playground: true,
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    if (req.headers) {
      const token = req.get("Authorization") || "";
      try {
        const user = token
          ? await getUserFromToken(token.replace("Bearer ", ""))
          : null;
        return { user };
      } catch (e) {
        throw new AuthenticationError("Invalid Token");
      }
    }
  },
  formatError: (error) => {
    return {
      message: error.message,
      code: error.extensions.code,
      stacktrace: error.extensions.exception.stacktrace,
    };
  },
});
//For LocalHost
const port = 22000;
// For Server
/* const port = PORT; */
server.listen({ port }, () => {
  console.log(`Apollo Server running on http://localhost:${port}/graphql`);
});
