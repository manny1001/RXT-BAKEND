const bcrypt = require("bcryptjs");
const jsonwebtoken = require("jsonwebtoken");
const models = require("../models");
const nodemailer = require("nodemailer");
require("dotenv").config();
const resolvers = {
  Query: {
    async currentUser(_, args, { user }) {
      if (!user) throw new Error("You are not authenticated");
      return await models.User.findByPk(user.id);
    },
    async currentDriver(_, args, { user }) {
      if (!user) throw new Error("You are not authenticated");
      return await models.Drivers.findByPk(user.id);
    },
    async user(root, { id }, { user }) {
      try {
        if (!user) throw new Error("You are not authenticated!");
        return models.User.findByPk(id);
      } catch (error) {
        throw new Error(error.message);
      }
    },
    async allUsers(root, args, { user }) {
      try {
        if (!user) throw new Error("You are not authenticated!");
        return models.User.findAll();
      } catch (error) {
        throw new Error(error.message);
      }
    },
    async allDriver(root, args, { user }) {
      try {
        if (!user) throw new Error("You are not authenticated!");
        return models.Drivers.findAll({
          where: {
            status: ["Online"],
          },
        });
      } catch (error) {
        throw new Error(error.message);
      }
    },
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
        console.log(userTrip);
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
              "Complete",
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
      const { uuidtrip, uuidUser, uuidDriver } = arg;
      try {
        if (!user) throw new Error("You are not authenticated!");
        const currentMessage = await models.Message.findAll({
          where: {
            uuidtrip,
            uuidUser,
            uuidDriver,
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
            uuid: Message.dataValues.uuidUser,
          },
        });
        return user[0].dataValues;
      } catch (error) {
        throw new Error(error.message);
      }
    },
  },
  Mutation: {
    async postMessage(_, { text, image, video, uuid, uuidtrip }, {}) {
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
              { id: CurrentDriver[0].dataValues.id },
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
        if (CurrentDriver.length === 0) {
          try {
            const CurrentDriver = await models.Drivers.create({
              cellphone,
            });

            const token = jsonwebtoken.sign(
              { id: CurrentDriver.id },
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
      } else {
        const CurrentUser = await models.User.findAll({ where: { cellphone } });

        if (CurrentUser.length === 1) {
          try {
            const token = jsonwebtoken.sign(
              { id: CurrentUser[0].dataValues.id },
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
              { id: user.id },
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
    async updateProfile(
      _,
      { uuidUser, username, email, cellphone, homeaddress, workaddress }
    ) {
      try {
        await models.User.update(
          {
            username,
            email,
            cellphone,
            homeaddress,
            workaddress,
          },
          { where: { uuid: uuidUser } }
        );
        return "Successfully Updated";
      } catch {
        (err) => console.log(err);
      }
    },
    async updateUserName(_, { uuidUser, username }) {
      console.log(uuidUser, username);
      try {
        await models.User.update(
          {
            username,
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
      { uuid, username, cellphone, location, destination, uuidDriver }
    ) {
      try {
        await models.Trips.create({
          uuidUser: uuid,
          username,
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
};
module.exports = resolvers;
