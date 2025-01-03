require("dotenv").config();
const cors = require("cors");
const express = require("express");
const { ApolloServer, AuthenticationError } = require("apollo-server-express");
const jwt = require("jsonwebtoken");
const typeDefs = require("./schema");
const resolvers = require("./resolvers");
const UserController = require("./controllers/user");
const DriverController = require("./controllers/driver");
const { networkInterfaces } = require("os");

const app = express();
app.use(cors());
// Configure CORS for specific routes
app.use(
  "/graphql",
  cors({
    origin: ["http://192.168.1.3:8081", "https://studio.apollographql.com"],
    credentials: true, // Use true if you need to allow credentials
    methods: ["GET", "POST", "OPTIONS"], // Allow necessary HTTP methods
    allowedHeaders: [
      "Content-Type",
      "Authorization", // Allow token-based authentication headers
      "Access-Control-Allow-Origin", // Remove this if unnecessary
    ],
  })
);
const { JWT_SECRET, RDS_PORT, PORT } = process.env;

const getUserFromToken = (token) =>
  new Promise((resolve, reject) => {
    jwt.verify(token, JWT_SECRET, async (err, tokenPayload) => {
      if (err) {
        return reject(err);
      }

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

const apolloServer = new ApolloServer({
  cors: true,
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

const nets = networkInterfaces();
const results = []; // Or just '{}', an empty object

for (const name of Object.keys(nets)) {
  for (const net of nets[name]) {
    // Skip over non-IPv4 and internal (i.e. 127.0.0.1) addresses
    // 'IPv4' is in Node <= 17, from 18 it's a number 4 or 6
    const familyV4Value = typeof net.family === "string" ? "IPv4" : 4;
    if (net.family === familyV4Value && !net.internal) {
      if (!results[name]) {
        results[name] = [];
      }
      results[name].push(net.address);
    }
  }
}
const wifiKeys = Object.keys(results).filter(key => key.startsWith('WiFi'));
wifiKeys.forEach(key => console.log(results[key]));
var port = process.env.PORT || 22000;
apolloServer.start().then((res) => {
  apolloServer.applyMiddleware({ app });
  app.listen(port, () =>
    console.log(
      `Apollo Server running on http://localhost:3307/graphql`
    )
  );
});
