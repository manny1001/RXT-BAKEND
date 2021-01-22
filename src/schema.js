const { gql } = require("apollo-server");
const typeDefs = gql`
  type User {
    id: Int!
    username: String
    email: String!
    cellphone: String!
    otp: String!
    homeaddress: String!
    workaddress: String!
    picture: String!
    acceptedtcs: String!
    totalrequests: String!
  }
  type Driver {
    id: Int!
    name: String!
    surname: String!
    cellphone: String!
    email: String!
    homeaddress: String!
    picture: String!
    acceptedtcs: String!
    totalrequests: String!
  }
  type UserAuthPayload {
    token: String!
    user: User!
  }
  type Query {
    user(id: Int!): User
    allUsers: [User!]!
    currentUser: User
    driver(id: Int!): Driver
    allDrivers: [Driver!]!
    currentDriver: Driver
  }
  type Mutation {
    login(cellphone: String!, otp: String!): UserAuthPayload
  }
`;
module.exports = typeDefs;
