const { gql } = require("apollo-server");
const typeDefs = gql`
  type User {
    id: Int
    username: String
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
    id: Int
    name: String
    surname: String
    cellphone: String
    email: String
    homeaddress: String
    registration: String
    model: String
    picture: String
    acceptedtcs: String
    totalrequests: String
  }
  type Trips {
    username: String
    cellphone: String
    location: String
    destination: String
    total: String
    tip: String
    paymentmethod: String
    status: String
    rating: String
    drivername: String
    driversurname: String
    driverregistration: String
    model: String
    driverresponsetime: String
    driverarrivaltime: String
    drivercustomerarrivaltime: String
  }
  type UserAuthPayload {
    token: String!
  }
  type Query {
    user(id: Int!): User
    allUsers: [User!]!
    currentUser: User
    driver(id: Int!): Driver
    allDriver: [Driver]
    currentDriver: Driver
  }
  type Mutation {
    login(cellphone: String!): UserAuthPayload
    updateProfile(
      id: String!
      username: String
      email: String
      cellphone: String
      homeaddress: String
      workaddress: String
    ): String
    newTripRequest(
      username: String!
      cellphone: String!
      location: String!
      destination: String!
      paymentmethod: String!
    ): String
  }
`;
module.exports = typeDefs;
