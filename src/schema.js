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
    driversLiveLocation: String
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
  }
  type UserHistory {
    uuidTrip: String
    updatedAt: String
    createdAt: String
    location: String
    destination: String
    tip: String
    status: String
    totalAmount: String
    paymentmethod: String
    rating: String
    drivername: String
    driversurname: String
    driverregistration: String
    model: String
  }

  type Query {
    user(id: Int!): User
    allUsers: [User!]!
    currentUser: User
    driver(id: Int!): Driver
    allDriver: [Driver]
    currentDriver: Driver
    getDriverRequestResponse(uuidUser: String!): Trips
    getRequestHistory(uuidUser: String!): [UserHistory]
    getCurrentRequest(uuidDriver: String!): [Trips]
    getDriversLocation(uuidUser: String!): [Trips]
  }
  type Mutation {
    login(cellphone: String!, type: String!): UserAuthPayload
    updateProfile(
      uuidUser: String!
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
    UpdateDriverStatus(driveruuid: String, status: String): String
    newRequestResponse(uuidDriver: String, status: String): String
  }
`;
module.exports = typeDefs;
