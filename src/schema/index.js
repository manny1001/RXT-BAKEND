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
  type Query {
    currentUser: User
    currentDriver: Driver
    allDriver: [Driver]
    driversLocation(uuidUser: String!): Trips
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
  }
`;

module.exports = typeDefs;
