const { gql } = require("apollo-server");
const typeDefs = gql`
  type User {
    id: Int
    uuid: String
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
    uuid: String
    name: String
    surname: String
    status: String
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
    id: String
    uuidTrip: String
    uuidUser: String
    username: String
    cellphone: String
    location: String
    destination: String
    totalAmount: String
    tip: String
    paymentmethod: String
    status: String
    rating: String
    uuidDriver: String
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
    refreshToken: String!
    user: User
  }
  type Query {
    user(id: Int!): User
    allUsers: [User!]!
    currentUser: User
    driver(id: Int!): Driver
    allDriver: [Driver]
    currentDriver: Driver
    getDriverRequestResponse(uuidUser: String!): Trips
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
      uuid: String
      username: String
      cellphone: String
      location: String
      destination: String
      uuidDriver: String
      drivername: String
      driversurname: String
      driverregistration: String
      model: String
    ): String
    TripCardPaymentCashConfirmation(
      uuidTrip: String
      totalAmount: String
      paymentMethod: String
    ): String
    selectNewDriver(driveruuid: String, useruuid: String): String
  }
`;
module.exports = typeDefs;
