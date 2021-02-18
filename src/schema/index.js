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
    _id: Int
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
    name: String
    cellphone: String
    location: String
    destination: String
    totalAmount: String
    tip: String
    paymentmethod: String
    status: String
    rating: String
    uuidDriver: String
    driversCellphone: String
    driverImage: String
    driversLiveLocation: String
    drivername: String
    driversurname: String
    driverregistration: String
    model: String
    driverduration: String
    driverremainingtime: String
    drivercustomerarrivaltime: String
  }
  type Message {
    _id: String!
    text: String!
    image: String
    video: String
    uuidtrip: String!
    uuid: String
    user: User
    createdAt: String
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
    currentUser: User
    currentDriver: Driver
    allDriver: [Driver]
    driversLocation(uuidUser: String, uuidTrip: String): [Trips]
    messages(uuidtrip: String, uuid: String): [Message]
    getRequestHistory(uuidUser: String!): [UserHistory]
    getDriverRequestResponse(uuidUser: String!): Trips
    getCardPaymentResult(
      uuidTrip: String!
      totalAmount: String!
      paymentMethod: String!
    ): [Trips]
  }
  type UserAuthPayload {
    token: String!
  }
  type Mutation {
    login(cellphone: String!, type: String!): UserAuthPayload!
    updateProfile(
      uuidUser: String!
      name: String
      email: String
      cellphone: String
      homeaddress: String
      workaddress: String
    ): String
    newTripRequest(
      uuid: String
      name: String
      cellphone: String
      location: String
      destination: String
      uuidDriver: String
      drivername: String
      driversurname: String
      driverregistration: String
      model: String
    ): String
    selectNewDriver(driveruuid: String, useruuid: String): String
    TripCardPaymentCashConfirmation(
      uuidTrip: String
      totalAmount: String
      paymentMethod: String
    ): String
    UpdateDriverStatus(driveruuid: String, status: String): String
    newRequestResponse(
      uuidDriver: String
      status: String
      uuidTrip: String
    ): String
    postMessage(
      text: String!
      image: String
      video: String
      uuid: String
      uuidtrip: String!
    ): String
    alertEmail(uuidTrip: String, message: String, status: String): String
  }
`;

module.exports = typeDefs;
