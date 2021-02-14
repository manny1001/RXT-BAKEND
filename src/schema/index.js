const { gql } = require("apollo-server");
const typeDefs = gql`
  type User {
    _id: Int
    uuid: String
    name: String
    email: String
    cellphone: String
    otp: String
    homeaddress: String
    workaddress: String
    picture: String
    acceptedtcs: String
    totalrequests: String
  }
  type Driver {
    _id: String
    uuid: String
    name: String
    surname: String
    cellphone: String
    email: String
    status: String
    homeaddress: String
    picture: String
    acceptedtcs: String
    totalrequests: String
    registration: String
    model: String
    gender: String
  }
  type Query {
    currentUser: User
    currentDriver: Driver
  }
  type UserAuthPayload {
    token: String!
    refreshToken: String!
  }
  type Mutation {
    login(cellphone: String!, type: String!): UserAuthPayload
  }
`;

module.exports = typeDefs;
