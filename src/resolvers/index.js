const nodemailer = require("nodemailer");
const UserController = require("../controllers/user");
const DriverController = require("../controllers/driver");
const TripsController = require("../controllers/trips");
const MessagesController = require("../controllers/message");
const CheckOutController = require("../controllers/checkout");

require("dotenv").config();
module.exports = [
  {
    Query: {
      currentUser: async (_, {}, { user }) => {
        return await UserController.getUserById(user._id);
      },
      currentDriver: async (_, {}, { user }) => {
        return await DriverController.getDriverById(user._id);
      },
      allDriver: async (_, {}, { user }) => {
        if (!user) throw new Error("You are not authenticated!");
        return await DriverController.getOnlineDrivers();
      },
      driversLocation: async (_, { uuidUser, uuidTrip }, { user }) => {
        if (!user) throw new Error("You are not authenticated!");
        return await TripsController.getDriversLocation(uuidUser, uuidTrip);
      },
      messages: async (_, { uuidtrip, uuid }, { user }) => {
        if (!user) throw new Error("You are not authenticated!");
        return await MessagesController.getMessages(uuidtrip, uuid);
      },
      getRequestHistory: async (_, { uuidUser }, { user }) => {
        if (!user) throw new Error("You are not authenticated!");
        return await TripsController.getUsersRequestHistory(uuidUser);
      },
      getDriverRequestResponse: async (_, { uuidUser }, { user }) => {
        if (!user) throw new Error("You are not authenticated!");
        return await TripsController.getRequestResponse(uuidUser);
      },
      getCardPaymentResult: async (
        _,
        { uuidTrip, totalAmount, paymentMethod },
        { user }
      ) => {
        if (!user) throw new Error("You are not authenticated!");
        return await TripsController.getCardPaymentResult(
          uuidTrip,
          totalAmount,
          paymentMethod
        );
      },
    },
    Message: {
      user: async (Message) => {
        return await MessagesController.getUserMessage(Message);
      },
    },
    Mutation: {
      login: async (_, { cellphone, type }) => {
        console.log(cellphone, type);
        if (type === "user") {
          return await UserController.userLogin({ cellphone, type });
        }
        if (type === "driver") {
          return await DriverController.driverLogin({ cellphone, type });
        }
      },
      updateProfile: async (
        _,
        { uuidUser, name, email, cellphone, homeaddress, workaddress },
        { user }
      ) => {
        UserController.updateProfile(
          uuidUser,
          name,
          email,
          cellphone,
          homeaddress,
          workaddress
        );
        return "Succesfully Updated";
      },
      newTripRequest: async (
        _,
        { uuid, name, cellphone, location, destination, uuidDriver },
        {}
      ) => {
        return await TripsController.createNewTrip(
          uuid,
          name,
          cellphone,
          location,
          destination,
          uuidDriver
        );
      },
      selectNewDriver: async (_, { driveruuid, useruuid }, { user }) => {
        return await TripsController.createNewDriver(driveruuid, useruuid);
      },
      TripCardPaymentCashConfirmation: async (
        _,
        { uuidTrip, totalAmount, paymentMethod },
        {}
      ) => {
        return await TripsController.PayOrConfirm(
          uuidTrip,
          totalAmount,
          paymentMethod
        );
      },
      UpdateDriverStatus: async (_, { driveruuid, status }, { user }) => {
        return await DriverController.updateStatus(driveruuid, status);
      },
      newRequestResponse: async (
        _,
        { uuidDriver, status, uuidTrip },
        { user }
      ) => {
        return TripsController.requestResponse(uuidDriver, status, uuidTrip);
      },
      postMessage: async (
        _,
        { text, image, video, uuid, uuidtrip },
        { user }
      ) => {
        return await MessagesController.postMessage(
          text,
          image,
          video,
          uuid,
          uuidtrip
        );
      },
      alertEmail: async (_, {}, { user }) => {
        async function main() {
          const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
              user: "Emmanuelmuya@gmail.com",
              pass: "@Emman1000",
            },
          });

          const mailOptions = {
            from: "Emmanuelmuya@gmail.com",
            to: "Emmanuelmuya@gmail.com",
            subject: "Ticket" + status,
            text: message + " " + uuidTrip,
          };

          console.log("Message sent");

          transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
              console.log(error);
            } else {
              console.log("Email sent: " + info.response);
            }
          });
        }
        main();
      },
      createCheckoutSession: async (_, { uuidTrip, uuidUser }, { user }) => {
        if (!user) throw new Error("You are not authenticated!");
        return await CheckOutController.createCheckoutSession();
      },
    },
  },
];
