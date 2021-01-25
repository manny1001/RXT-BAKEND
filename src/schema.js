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
    model : String
    picture: String
    acceptedtcs: String
    totalrequests: String
  }
  type Trips {
    customername: String
    customersurname: String
    customercellphone: String
    customerlocation: String
    customerdestination: String
    total: String
    fee: String
    tip: String
    status: String
    rating: String
    drivername: String
    driversurname: String
    driverregistration: String
    carmodel: String
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
    allDrivers: [Driver]
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
      customername: String!
      customersurname: String!
      customercellphone: String!
      customerlocation: String!
      customerdestination: String!
      status: String!
    ): String
  }
`;
module.exports = typeDefs;
