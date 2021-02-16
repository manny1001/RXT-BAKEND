const bcrypt = require("bcryptjs");
const jsonwebtoken = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const UserController = require("../controllers/user");
const DriverController = require("../controllers/driver");
const TripsController = require("../controllers/trips");
const MessagesController = require("../controllers/message");

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
        { uuidUser, name, email, cellphone, homeaddress, workaddress }
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
        { uuidUser, name, cellphone, location, destination, uuidDriver },
        {}
      ) => {
        return await TripsController.createNewTrip(
          uuidUser,
          name,
          cellphone,
          location,
          destination,
          uuidDriver
        );
      },
      selectNewDriver: async (_, { driveruuid, useruuid }, {}) => {
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
      UpdateDriverStatus: async (_, { driveruuid, status }, {}) => {
        return await DriverController.updateStatus(driveruuid, status);
      },
      newRequestResponse: async (_, { uuidDriver, status, uuidTrip }, {}) => {
        return TripsController.requestResponse(uuidDriver, status, uuidTrip);
      },
      postMessage: async (_, { text, image, video, uuid, uuidtrip }, {}) => {
        return await MessagesController.postMessage(
          text,
          image,
          video,
          uuid,
          uuidtrip
        );
      },
      alertEmail: async (_, { uuidTrip, message, status }, {}) => {
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
    },
  },
];
/* const resolvers = {
  Query: {
   
     
    
    async getDriverRequestResponse(root, { uuidUser }, { user }) {
      try {
        if (!user) throw new Error("You are not authenticated!");
        const userTrip = await models.Trips.findAll({
          limit: 1,
          where: {
            uuidUser,
            status: ["Pending Payment", "Declined"],
          },
          order: [["updatedAt", "DESC"]],
        });

        if (userTrip[0] === undefined) return {};
        return userTrip[0].dataValues;
      } catch (error) {
        throw new Error(error.message);
      }
    },
    async getRequestHistory(root, { uuidUser }, { user }) {
      try {
        if (!user) throw new Error("You are not authenticated!");
        const userTrips = await models.Trips.findAll({
          where: {
            uuidUser,
            status: ["Complete", "Cancelled", "Active"],
          },
        });
        return userTrips;
      } catch (error) {
        throw new Error(error.message);
      }
    },

    async getCurrentRequest(root, { uuidDriver }, { user }) {
      try {
        if (!user) throw new Error("You are not authenticated!");
        const currentRequest = await models.Trips.findAll({
          limit: 1,
          where: {
            uuidDriver,
            status: [
              "Pending Driver",
              "Pending Payment",
              "Paid,WaitingDriver",
              "On-Route,Pickup",
              "Confirmed,WaitingDriver",
            ],
          },
        });
        return currentRequest;
      } catch (error) {
        throw new Error(error.message);
      }
    },
    async getDriversLocation(root, { uuidUser }, { user }) {
      try {
        if (!user) throw new Error("You are not authenticated!");
        const currentRequest = await models.Trips.findAll({
          limit: 1,
          where: {
            uuidUser,
            status: [
              "On-Route,Pickup",
              "Arrived",
              "Confirmed,WaitingDriver",
              "Paid,WaitingDriver",
            ],
          },
        });
        return currentRequest;
      } catch (error) {
        throw new Error(error.message);
      }
    },
    async messages(root, arg, { user }) {
      const { uuidtrip, uuid } = arg;
      try {
        if (!user) throw new Error("You are not authenticated!");
        const currentMessage = await models.Message.findAll({
          where: {
            uuidtrip,
          },
        });

        return currentMessage;
      } catch (error) {
        throw new Error(error.message);
      }
    },
      },
     
  Message: {
    user: async (Message) => {
      try {
        const user = await models.User.findAll({
          limit: 1,
          where: {
            uuid: Message.dataValues.uuid,
          },
        });
        const driver = await models.Drivers.findAll({
          limit: 1,
          where: {
            uuid: Message.dataValues.uuid,
          },
        });

        return {
          ...(user && user[0] && user[0].dataValues),
          ...(driver && driver[0] && driver[0].dataValues),
        };
      } catch (error) {
        throw new Error(error.message);
      }
    },
  },
  Mutation: {
    async PostMessage(_, { text, image, video, uuid, uuidtrip }, {}) {
      try {
        await models.Message.create({
          text,
          image,
          video,
          uuid: uuid,
          uuidtrip: uuidtrip,
        });
        return "Message Sent";
      } catch (error) {
        throw new Error(error.message);
      }
    },
    async login(_, { cellphone, type }) {
      if (type === "Driver") {
        const CurrentDriver = await models.Drivers.findAll({
          where: { cellphone },
        });
        if (CurrentDriver.length === 1) {
          try {
            const token = jsonwebtoken.sign(
              { id: CurrentDriver[0].dataValues._id },
              process.env.JWT_SECRET,
              {
                expiresIn: "3d",
              }
            );
            return {
              token,
            };
          } catch (error) {
            throw new Error(error.message);
          }
        }
        if (CurrentDriver.length === 0) {
          try {
            const CurrentDriver = await models.Drivers.create({
              cellphone,
            });

            const token = jsonwebtoken.sign(
              { id: CurrentDriver._id },
              process.env.JWT_SECRET,
              {
                expiresIn: "3d",
              }
            );
            return {
              token,
            };
          } catch (error) {
            throw new Error(error.message);
          }
        }
      } else {
        const CurrentUser = await models.User.findAll({ where: { cellphone } });
        if (CurrentUser.length === 1) {
          try {
            const token = jsonwebtoken.sign(
              { id: CurrentUser[0].dataValues._id },
              process.env.JWT_SECRET,
              {
                expiresIn: "2d",
              }
            );
            return {
              token,
            };
          } catch (error) {
            throw new Error(error.message);
          }
        }

        if (CurrentUser.length === 0) {
          try {
            const user = await models.User.create({
              cellphone,
            });
            const token = jsonwebtoken.sign(
              { id: user._id },
              process.env.JWT_SECRET,
              {
                expiresIn: "2d",
              }
            );
            return {
              token,
            };
          } catch (error) {
            throw new Error(error.message);
          }
        }
      }
    },
   
    async updateUserName(_, { uuidUser, name }) {
      try {
        await models.User.update(
          {
            name,
          },
          { where: { uuid: uuidUser } }
        );
        return "Successfully Updated UserName";
      } catch {
        (err) => console.log(err);
      }
    },
    async newTripRequest(
      root,
      { uuidUser, name, cellphone, location, destination, uuidDriver }
    ) {
      try {
        await models.Trips.create({
          uuidUser,
          name,
          cellphone,
          location,
          destination,
          uuidDriver,
          status: "Pending Driver",
        });

        await models.Drivers.update(
          {
            status: "Offline",
          },
          {
            where: { uuid: uuidDriver },
          }
        );

        return "Succesfully Requested, Awaiting Driver Response";
      } catch (error) {
        throw new Error(error.message);
      }
    },
    async TripCardPaymentCashConfirmation(
      _,
      { uuidTrip, totalAmount, paymentMethod }
    ) {
      try {
        await models.Trips.update(
          {
            totalAmount,
            paymentmethod: paymentMethod,
            status:
              paymentMethod === "Card"
                ? "Paid,WaitingDriver"
                : "Confirmed,WaitingDriver",
          },
          { where: { uuidTrip: uuidTrip } }
        );
        return "Success, Awaiting Driver...";
      } catch {
        (err) => console.log(err);
      }
    },
    async selectNewDriver(_, { driveruuid, useruuid }) {
      try {
        await models.Trips.update(
          {
            uuidDriver: driveruuid,
          },
          {
            where: { uuidUser: useruuid, status: "Pending Driver" },
            order: [["updatedAt", "DESC"]],
          }
        );
        return "Succesfully Re-Requested, Awaiting Driver Response";
      } catch {
        (err) => console.log(err);
      }
    },
    async UpdateDriverStatus(_, { driveruuid, status }) {
      try {
        await models.Drivers.update(
          {
            status,
          },
          {
            where: { uuid: driveruuid },
          }
        );
        return "Succesfully updated";
      } catch {
        (err) => console.log(err);
      }
    },
    async newRequestResponse(_, { uuidDriver, status }) {
      try {
        await models.Trips.update(
          {
            status: status,
          },
          {
            where: {
              uuidDriver,
            },
          }
        );
        return "Success";
      } catch {
        (err) => console.log(err);
      }
    },
    async alertEmail(_, { uuidTrip, message, status }) {
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
  },
};
module.exports = resolvers;
 */
